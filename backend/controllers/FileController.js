// controllers/fileController.js

const { Account } = require('../models/AccountModal');
const { File } = require('../models/FileModal');
const { Op, where } = require("sequelize");
const { Sequelize } = require("sequelize");
const { sequelize } = require('../Database/Db');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { Tag } = require('../models/tagModal');
const { User, Role } = require('../models/UserModel');
const FileNotification = require('../models/FileNotificationModal');
const { Filenotification } = require('../models/FileNotificationModal');
const { sendSMSNotification } = require('../utils/notification');
const S3 = true


// Function to save file locally
const saveLocally = async (file) => {
  const randomId = uuid();
  const fileExtension = getFileExtension(file.originalname);
  const imagePath = path.join(__dirname, '../views/assets', `${randomId}${fileExtension}`);

  // Write the file to the specified path
  fs.writeFileSync(imagePath, file.buffer);

  // Return the path to the saved file
  return `/assets/${randomId}${fileExtension}`;
};

// Function to get file extension
const getFileExtension = (filename) => {
  return path.extname(filename);
};


exports.addFile = async (req, res) => {

  const { file } = req;
  console.log(file);
  console.log(req.body);
  const {
    title,
    description,
    accountId,
    category,
    subcategory,
    finalDate,
    NumberofDays,
    medium,
    selectedUsers,
    notificationEnabled,
    tags,
    status
  } = req.body;

  try {

    const days = parseInt(NumberofDays);
    // Convert finalDate to Date object
    const finalDateTimeStamp = new Date(finalDate);
    // Subtract numberOfDays from finalDate
    finalDateTimeStamp.setDate(finalDateTimeStamp.getDate() - days);
    // Format the new notification date as "YYYY-MM-DD" 
    const year = finalDateTimeStamp.getFullYear();
    const month = (finalDateTimeStamp.getMonth() + 1).toString().padStart(2, '0');
    const day = finalDateTimeStamp.getDate().toString().padStart(2, '0');
    const newNotificationDate = `${year}-${month}-${day}`;


    const tagPromises = tags.map(async (tagData) => {
      // Find or create a tag with the current tagData
      const [tag, created] = await Tag.findOrCreate({
        where: { tagname: tagData.trim() }, // Trim whitespace from tagData and search by tagname
        defaults: { tagname: tagData.trim() } // If tag doesn't exist, create it
      });
      return tag; // Return the found or created tag
    });

    // Execute all tag creation promises concurrently
    const createdTags = await Promise.all(tagPromises);

    let imageUrl;

    if (S3 === "false") {
      // Upload to S3 bucket
      imageUrl = await uploadToS3(file);
    } else {
      // Store locally
      imageUrl = await saveLocally(file);
    }

    const newFile = await File.create({
      title,
      description,
      accountId,
      subcategory,
      category,
      file: imageUrl,
      finalDate,
      notificationDate: newNotificationDate,
      notificationEnabled,
      tags: createdTags.map(tag => tag.tagname),
      status
    });

    // Create an array to hold the promises returned by User.findByPk
    const userIDPromises = selectedUsers.map(async (userid) => {
      // Find the user by ID
      const user = await User.findByPk(userid);
      if (user) {
        // Send email notification to user
        // sendSMSNotification(user.email, "Notification Subject", "Notification Body");
        // console.log("Email notification sent to:", user.email); // Log email notification sent
        return user.id;
      } else {
        console.log("User not found for ID:", userid); // Log if user is not found
        return null;
      }
    });

    // Execute all User.findByPk promises concurrently
    const createdIDs = await Promise.all(userIDPromises);
    // Create file notifications for each user ID
    const fileNotificationPromises = createdIDs.map(async (userId) => {
      if (userId) {
        // Convert NumberofDays to an integer
        const days = parseInt(NumberofDays);

        return Filenotification.create({
          endDate: finalDate,
          fileId: newFile.id,
          status: status === 'Active' ? true : false,
          medium,
          NumberofDays: days, // Updated to integer
          nextNotificationDate: newNotificationDate,
          userId: createdIDs // Associate the user ID with the file notification
        });
      }
      return null;
    });



    await Promise.all(fileNotificationPromises);

    res.status(201).json({ message: "File Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while creating the file' });
  }
};


exports.getFiles = async (req, res) => {
  const searchterm = req.query.searchQuery;
  const selectedDate = req.query.selectedDate;
  const filter = req.query.filter;
  console.log(filter);
  try {
    const userId = req.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const options = {
      limit: limit,
      offset: offset,
      include: [
        {
          model: Account,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
      order: [['updatedAt', 'DESC']],
    };

    const admin = await User.findOne({ where: { id: userId } });

    // Aggregate file status counts
    const fileStatusCounts = await File.aggregate('status', 'count', { plain: false, group: ['status'] });

    // Add search condition if searchterm is provided
    if (searchterm) {
      options.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchterm}%` } },
          { category: { [Op.iLike]: `%${searchterm}%` } }
        ],
      };
    }

    if (filter) {
      options.where = {
          ...options.where,
          status: { [Op.iLike]: `%${filter}%` },
      };
  }
  
    // Add date condition if selectedDate is provided
    if (selectedDate) {
      const isoDate = new Date(selectedDate).toISOString();
      options.where = {
        ...options.where,
        finalDate: isoDate,
      };
    }

    // Fetch favorite files
    const favoriteFiles = await Promise.all(admin.favFileIds.map(async fileId => {
      const file = await File.findByPk(fileId, options);
      return file;
    }));


    // Fetch files based on options
    const files = await File.findAndCountAll(options);

    // Fetch user data including role
    const user = await User.findOne({
      where: { id: userId },
      include: Role // Adjust inclusion of Role model according to your schema
    });

    // Return response
    res.json({
      fileStatusCounts: fileStatusCounts,
      files: files.rows,
      favfileid: user.favFileIds,
      favfiles: favoriteFiles,
      totalPages: Math.ceil(files.count / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the files' });
  }
};


exports.getAssignedFiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const userId = req.id;

    const options = {
      limit: limit,
      offset: offset,
      include: [
        {
          model: Account, // Include the Account model
          include: [
            {
              model: User, // Include the User model for manager details
              // Use the alias specified in your Account/User associations
            },
          ],
        },
        // {
        //  model: Filenotification // Include the Filenotification model
        // }
      ],
      order: [['updatedAt', 'DESC']], // Order by updatedAt in descending order
    };

    console.log(userId);
    const getUserAssignedFiles = await Filenotification.findAll({
      where: {
        userId: {
          [Op.contains]: [userId]
        }
      }
    });

    const fileIds = getUserAssignedFiles.flatMap(notification => notification.fileId);

    const files = await File.findAndCountAll({
      where: {
        id: fileIds
      },
      ...options // Spread the options object here
    });


    res.status(200).json({
      success: true,
      assignedfiles: files.rows,
      totalPages: Math.ceil(files.count / limit)
    });
  } catch (error) {
    console.error('Error fetching favorite files:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.updateFile = async (req, res) => {
  try {
    const { file } = req;
    console.log("Uploaded file:", file);
    console.log("Request body:", req.body);

    // Destructure request body
    const {
      id,
      title,
      description,
      accountId,
      category,
      finalDate,
      numberofDays,
      medium,
      selectedUsers,
      notificationEnabled,
      tags,
      status
    } = req.body;

    // Create or find tags concurrently
    const tagPromises = tags.map(async (tagData) => {
      // Find or create a tag with the current tagData
      const [tag, created] = await Tag.findOrCreate({
        where: { tagname: tagData.trim() }, // Trim whitespace from tagData and search by tagname
        defaults: { tagname: tagData.trim() } // If tag doesn't exist, create it
      });
      return tag; // Return the found or created tag
    });

    // Execute all tag creation promises concurrently
    const createdTags = await Promise.all(tagPromises);

    let imageUrl;

    // Check if a new file is provided and S3 is set to false
    if (file && S3 === "false") {
      // Upload to S3 bucket
      imageUrl = await uploadToS3(file);
    } else if (file) {
      // Store locally
      imageUrl = await saveLocally(file);
    }

    const parseid = parseInt(id);

    // Find file by ID
    const existingFile = await File.findOne({ where: { id: parseid } });

    // Handle file not found
    if (!existingFile) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Update file properties if a new file is provided
    if (imageUrl) {
      existingFile.file = imageUrl;
    }

    // Update other properties
    existingFile.title = title;
    existingFile.description = description;
    existingFile.accountId = accountId;
    existingFile.category = category;
    existingFile.finalDate = finalDate;
    existingFile.notificationEnabled = notificationEnabled;
    existingFile.tags = createdTags.map(tag => tag.tagname);
    existingFile.status = status;

    await existingFile.save();

    // Update File notification
    const updatedNotification = await Filenotification.findOne({ where: { fileId: parseid } });
    console.log("numberOfDays", numberofDays);
    console.log(updatedNotification);
    if (updatedNotification) {
      updatedNotification.endDate = finalDate;
      updatedNotification.status = status === 'Active';
      updatedNotification.medium = medium;
      updatedNotification.NumberofDays = parseInt(numberofDays);
      updatedNotification.nextNotificationDate = notificationEnabled ? new Date() : null;
      updatedNotification.userId = selectedUsers;
      await updatedNotification.save();
    }

    res.json({ message: 'File updated successfully', updatedFile: existingFile });
  } catch (error) {
    console.error("Error updating file:", error);
    res.status(500).json({ error: 'An error occurred while updating the file' });
  }
};



// Deletes a file by ID
exports.deleteFile = async (req, res) => {
  const { storedID } = req.query;
  try {
    const deleted = await File.destroy({ where: { id: storedID } });
    if (deleted) {
      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while deleting the file' });
  }
};

// // favoriteController.js
// exports.saveFavoriteFile = async (req, res) => {
//   try {
//     const fileId = req.query.fileId; // Retrieve fileId from query parameters

//     console.log(fileId);
//     if (!fileId) {
//       return res.status(400).json({ success: false, message: 'File ID missing' });
//     }

//     const file = await File.findOne({ where: { id: fileId } });

//     // If file not found, send an error response
//     if (!file) {
//       return res.status(404).json({ success: false, message: 'File not found' });
//     }

//     // Toggle the favorite status of the file
//     const updatedFavoriteStatus = !file.favouriteFile;
//     await file.update({ favouriteFile: updatedFavoriteStatus });

//     // Send success response
//     res.status(200).json({ success: true, message: 'Favorite status updated successfully', favouriteFile: updatedFavoriteStatus });
//   } catch (error) {
//     console.error('Error updating favorite status:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

exports.addFavoriteFile = async (req, res) => {
  try {
    const { fileId } = req.query;
    const userId = req.id;
    const numfileid = parseInt(fileId);

    // Find the user by ID
    const user = await User.findOne({ where: { id: userId } });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Initialize favFileIds as an empty array if it doesn't exist
    if (!user.favFileIds) {
      user.favFileIds = [];
    }

    // If fileId is not found in favFileIds array, add it
    await user.update({ favFileIds: sequelize.fn('array_append', sequelize.col('favFileIds'), fileId) });

    res.status(200).json({ success: true, message: 'File added to favorites successfully' });
  } catch (error) {
    console.error('Error adding file to favorites:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.removeFavoriteFile = async (req, res) => {
  try {
    const { fileId } = req.query;
    const userId = req.id;
    const numfileid = parseInt(fileId);

    // Find the user by ID
    const user = await User.findOne({ where: { id: userId } });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Initialize favFileIds as an empty array if it doesn't exist
    if (!user.favFileIds) {
      user.favFileIds = [];
    }

    // Check if the file is already starred
    const isFileAlreadyStarred = user.favFileIds.includes(numfileid);

    if (isFileAlreadyStarred) {
      // Remove fileId from favFileIds array
      user.favFileIds = user.favFileIds.filter(id => id !== numfileid);
      // Update the favFileIds array using Sequelize's provided methods
      await user.update({ favFileIds: user.favFileIds });

      return res.status(200).json({ success: true, message: 'File removed from favorites' });
    }

    res.status(404).json({ success: false, message: 'File not found in favorites' });
  } catch (error) {
    console.error('Error removing file from favorites:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};




