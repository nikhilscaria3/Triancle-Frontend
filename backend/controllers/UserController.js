const { where } = require('sequelize');
const bcrypt = require('bcryptjs');
const { User, Role } = require('../models/UserModel');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

exports.createUser = async (req, res) => {
    const userData = req.body;
    console.log("formData", userData);
    try {
        // Check if the role already exists
        let role = await Role.findOne({ where: { roletype: req.body.roletype } });

        // If the role doesn't exist, create a new one
        if (!role) {
            role = await Role.create({ roletype: req.body.roletype });
        }

        // Hash the password if it's not already hashed
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the new user with the retrieved or created role
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
            role: role.id,
            status: req.body.status,
        });

        // Send the newly created user as a response
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.log(error);
        // If an error occurs during the process, send an error response
        res.status(400).json({ error: 'An error occurred while creating the user' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        // Retrieve the token from the query parameters
        const email = req.email
        const searchterm = req.query.searchQuery;
        const Filter = req.query.Filter;
        const page = parseInt(req.query.page) || 1; // get the page number from query params or set it to 1 if it's not provided
        const limit = parseInt(req.query.limit) || 5; // get the number of records per page from query params or set it to 10 if it's not provided
        const offset = (page - 1) * limit; // calculate the offset


        // Define options for the findAndCountAll method
        const options = {
            limit: limit,
            offset: offset,
            include: [
                {
                    model: Role
                }
            ],
            order: [['updatedAt', 'DESC']], // Order by updatedAt in descending order
        };

        // If Filter is provided, filter users by role
        if (Filter) {
            // Find the role based on the provided filter value
            const role = await Role.findOne({ where: { roletype: Filter } });
            if (role) {
                options.where = {
                    [Op.and]: [
                        { role: role.id }, // Filter users by role id
                        // Add additional search conditions if needed
                    ],
                };
            }
        }

        // If searchterm is provided, add it to the options
        if (searchterm) {
            const isEmail = /\S+@\S+\.\S+/.test(searchterm); // Check if the search term is an email address

            // If options.where is already defined (due to Filter), use Op.and to combine the conditions
            // Otherwise, create a new options.where object
            options.where = options.where ? {
                [Op.and]: [
                    options.where, // Preserve existing conditions
                    {
                        [Op.or]: [
                            isEmail ? { email: { [Op.iLike]: `%${searchterm}%` } } : { name: { [Op.iLike]: `%${searchterm}%` } },
                            // Add more fields to search if needed
                        ],
                    },
                ],
            } : {
                [Op.or]: [
                    isEmail ? { email: { [Op.iLike]: `%${searchterm}%` } } : { name: { [Op.iLike]: `%${searchterm}%` } },
                    // Add more fields to search if needed
                ],
            };
        }

        // Find users with pagination using Sequelize
        const users = await User.findAndCountAll(options);

        const getallusers = await User.findAll({
            include: Role // Include the associated Role model
        });

        const user = await User.findOne({
            where: {
                email: email
            },
            include: Role // Correct the inclusion of Role model
        });

        const adminCount = await User.count({ where: { role: 1 /* Assuming 1 is the roletype for admin */ } });
        const userCount = await User.count({ where: { role: 2 /* Assuming 2 is the roletype for regular user */ } });

        // Get the count of users by status
        const activeUserCount = await User.count({ where: { status: true } });
        const inactiveUserCount = await User.count({ where: { status: false } });


        if (users.rows.length > 0) {
            // Return the users data
            res.json({
                totalUsers: getallusers,
                userCounts: [
                    { role: 'admin', count: adminCount },
                    { role: 'user', count: userCount },
                    { status: 'active', count: activeUserCount },
                    { status: 'inactive', count: inactiveUserCount }
                ],
                email: user.email,
                status: user.Role.roletype,
                username: user.name,
                users: users.rows,
                totalPages: Math.ceil(users.count / limit), // calculate the total number of pages
            });
        } else {
            // If users are not found, send a 404 response
            res.status(404).json({ message: 'Users not found' });
        }

    } catch (error) {
        // Handle errors
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    console.log("updatebody", req.body);
    try {
        const { id, name, email, phoneNumber, password, roletype, status } = req.body; // Extract updated user data from request body
        console.log(roletype);
        // Find the user by ID
        const user = await User.findOne({ where: { id } });

        // If user doesn't exist, return 404 Not Found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the password length is more than 15 characters
        const isPasswordLong = password.length > 15;

        // Hash the password if it's not already hashed and its length is not more than 15 characters
        const hashedPassword = isPasswordLong ? password : await bcrypt.hash(password, 10);

        // Find the role by roletype
        let role = await Role.findOne({ where: { roletype } });

        // If the role doesn't exist, create a new one
        if (!role) {
            role = await Role.create({ roletype });
        }

        // Assign the role to the user
        user.role = role.id;

        // Update the user data
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.password = hashedPassword; // Hash the password before saving
        user.status = status;

        // Save the updated user
        await user.save();

        return res.json({ message: 'User updated successfully', updatedUser: user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};



exports.deleteUser = async (req, res) => {
    const { storedID } = req.query;

    try {
        // Check if the user exists
        const user = await User.destroy({
            where: { id: storedID }
        });

        return res.json({ message: 'User deleted successfully', deletedUser: user });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};



exports.refreshToken = async (req, res) => {
    try {

        // Extract token from request headers
        const token = req.body.accessToken
        // Verify and decode token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const { email } = decodedToken;
        // Find user by email
        const user = await User.findOne({
            where: { email: email.toLowerCase() },
            include: Role // Include user's role if needed
        });

        if (user) {
            // Generate new token with appropriate expiration time
            const refreshtoken = jwt.sign({ email: user.email, type: 'refreshtoken', }, process.env.JWT_SECRET, { expiresIn: '15m' });
            const accesstoken = jwt.sign({ email: user.email, type: 'accesstoken', }, process.env.JWT_SECRET, { expiresIn: '7d' });
            console.log("success");
            // Send new token in response
            return res.status(200).json({ refreshtoken, accesstoken });

        } else {
            return res.status(404).json({ message: 'User not found' });
        }


    } catch (error) {
        console.error('Token refresh error:', error);
        return res.status(401).json({ message: 'Token refresh failed' });
    }
};



// exports.checktoken = async (req, res) => {
//     const { accesstoken } = req.query;
//     try {
//         // Verify the JWT token and extract its payload
//         const decodedToken = jwt.verify(accesstoken, process.env.JWT_SECRET);

//         // Extract user type from decoded token
//         const userType = decodedToken.userType;
//         console.log(userType);
//         // Send the user type in the response
//         res.json(userType);
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         res.status(500).json({ error: 'Error decoding token' });
//     }
// };