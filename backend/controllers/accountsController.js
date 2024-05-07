// controllers/accountsController.js

const { Account } = require('../models/AccountModal'); // Assuming your model file is named index.js and located in the models directory
const config = require("../config/config");
const { Op } = require("sequelize");
const { toInt } = require('validator');
const { User } = require('../models/UserModel');
const { Tag } = require('../models/tagModal');

const projectID = config.app.projectprefix
const availabletype = config.app.availabletype

// Retrieves all accounts along with user data based on managerID
exports.getAllAccounts = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery;
        const filter = req.query.filter;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;

        const options = {
            limit: limit,
            offset: offset,
            include: [{
                model: User,
                attributes: ['id', 'name', 'email'],
            }],
            order: [['updatedAt', 'DESC']],
        };

        if (searchQuery) {
            options.where = {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${searchQuery}%` } },
                    { type: { [Op.iLike]: `%${searchQuery}%` } },
                ],
            };
        }

        if (filter) {
            options.where = {
                ...options.where,
                status: { [Op.iLike]: `%${filter}%` },
            };
        }


        const accounts = await Account.findAndCountAll(options);
        const totalaccounts = await Account.findAll({
            include: [{
                model: User,
                attributes: ['id', 'name', 'email'], // Specify the attributes you want to include from the User model
            }],
        });

        const projectStatusCounts = await Account.aggregate('status', 'count', { plain: false, group: ['status'] });

        if (accounts.rows.length > 0) {
            res.json({
                count: accounts.count,
                projectStatusCounts: projectStatusCounts,
                accounts: accounts.rows,
                totalaccounts: totalaccounts,
                totalPages: Math.ceil(accounts.count / limit),
            });
        } else {
            res.status(404).json({ message: 'Project accounts not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching project accounts' });
    }
};


// Creates a new account
exports.createAccount = async (req, res) => {
    console.log(req.body);

    const { name, description, projectID, status, startDate, endDate, managerID, location, type, tags } = req.body;
    try {
        // Create an array to hold the promises returned by Tag.findOrCreate
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

        const newAccount = await Account.create({
            name,
            description,
            projectID,
            status,
            startDate,
            endDate,
            managerID,
            location,
            type,
            tags: createdTags.map(tag => tag.tagname) // Extract tag names from created tags
        });

        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};


exports.updateAccount = async (req, res) => {
    console.log(req.body);
    const {
        id,
        name,
        description,
        startDate,
        endDate,
        managerID,
        status,
        location,
        type,
        tags
    } = req.body;

    try {

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


        // Find the account by ID
        const account = await Account.findOne({ where: { id } });

        // If the account doesn't exist, return 404 Not Found
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Update the account data
        account.name = name;
        account.description = description;
        account.startDate = startDate;
        account.endDate = endDate;
        account.managerID = managerID;
        account.status = status;
        account.location = location;
        account.type = type;
        account.tags = createdTags.map(tag => tag.tagname)

        // Save the updated account
        await account.save();

        return res.json({ message: 'Account updated successfully', updatedAccount: account });
    } catch (error) {
        console.log(error);
        // Handle any errors that occur during the update process
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};



exports.deleteAccount = async (req, res) => {
    const { storedID } = req.query;
    console.log(storedID);
    try {
        const deleted = await Account.destroy({ where: { id: storedID } });
        if (deleted) {
            res.json({ message: 'Account deleted successfully' });
        } else {
            res.status(404).json({ error: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};
