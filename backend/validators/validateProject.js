const { body } = require('express-validator');
const validator = require('validator');

const validateUser = [
    // Validate name field
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must have at least 3 characters'),

    // Validate email field
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),

    // Validate jobRole field
    body('jobRole')
        .trim()
        .notEmpty().withMessage('Job role is required'),

    // Validate accessLevel field
    body('accessLevel')
        .trim()
        .notEmpty().withMessage('Access level is required'),

    // Validate phoneNo field
    body('phoneNo')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .isLength({ min: 10 }).withMessage('Phone number must have at least 10 digits'),

    // Validate status field
    body('status')
        .trim()
        .notEmpty().withMessage('Status is required')
        .custom(value => {
            // Check if status is either true or false
            return value === true || value === false;
        }).withMessage('Status must be either true or false'),

    // Validate idNumber field
    body('idNumber')
        .trim()
        .notEmpty().withMessage('ID number is required'),

    // Validate bloodGroup field
    body('bloodGroup')
        .trim()
        .notEmpty().withMessage('Blood group is required')
];

module.exports = validateUser;
