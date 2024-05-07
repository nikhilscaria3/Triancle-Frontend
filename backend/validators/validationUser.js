const { body } = require('express-validator');
const validator = require('validator');

const validateProject = [
    // Validate name field
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must have at least 3 characters'),

    // Validate projectId field
    body('projectId')
        .trim()
        .notEmpty().withMessage('Project ID is required'),

    // Validate location field
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required'),

    // Validate startDate field
    body('startDate')
        .trim()
        .notEmpty().withMessage('Start date is required'),
    // Validate endDate field
    body('endDate')
        .trim()
        .notEmpty().withMessage('End date is required'),

    // Validate percentageCompleted field
    body('percentageCompleted')
        .trim()
        .notEmpty().withMessage('Percentage completed is required')
        .isInt({ min: 0, max: 100 }).withMessage('Percentage must be between 0 and 100'),

    // Validate projectHead field
    body('projectHead')
        .trim()
        .notEmpty().withMessage('Project head is required')
];

module.exports = validateProject;
