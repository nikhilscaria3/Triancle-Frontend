// routes/calendarRoutes.js
const express = require('express');
const router = express.Router();

// Define common API suffix and prefix
const { app } = require('../config/config');
const { countDocuments } = require('../controllers/DashboardController');

const apiSuffix = app.apiPrefix + app.apiVersion;
const prefix = '/dashboard';

// GET /api/v1/account/getaccounts
router.get(`${apiSuffix}${prefix}/countdocuments`, countDocuments);

module.exports = router;
