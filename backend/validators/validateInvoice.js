const { body } = require('express-validator');

const validateInvoice = [
    // Validate invoiceNumber field
    body('invoiceNumber')
        .trim()
        .notEmpty().withMessage('Invoice number is required'),

    // Validate date field
    body('date')
        .trim()
        .notEmpty().withMessage('Date is required'),

    // Validate transactionNumber field
    body('transactionNumber')
        .trim()
        .notEmpty().withMessage('Transaction number is required'),

    // Validate nameAndAddress field
    body('nameAndAddress')
        .trim()
        .notEmpty().withMessage('Name and address is required'),

    // Validate gstinUin field
    body('gstinUin')
        .trim()
        .notEmpty().withMessage('GSTIN/UIN is required'),

    // Validate stateName field
    body('stateName')
        .trim()
        .notEmpty().withMessage('State name is required'),

    // Validate stateCode field
    body('stateCode')
        .trim()
        .notEmpty().withMessage('State code is required'),

    // Validate items field (assuming it's an array of items)
    body('items')
        .isArray({ min: 1 }).withMessage('At least one item is required'),

    // Validate totalInWords field
    body('totalInWords')
        .trim()
        .notEmpty().withMessage('Total in words is required'),

    // Validate total field
    body('total')
        .trim()
        .notEmpty().withMessage('Total amount is required'),

    // Validate email field
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address')
];

module.exports = validateInvoice;
