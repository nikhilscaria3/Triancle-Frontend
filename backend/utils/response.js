// response.js

// Function to send success response
const sendSuccessResponse = (res, data, message) => {
    return res.status(200 || 201).json({
        success: true,
        data,
        message: message || "Request successful",
    });
};

// Function to send error e
const sendErrorResponse = (res, statusCode, error) => {
    return res.status(statusCode || 500).json({
        success: false,
        error: error || "Internal Server Error",
    });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
