// routes/calendarRoutes.js
const express = require('express');
const router = express.Router();
const { getAllAccounts, createAccount, updateAccount, deleteAccount } = require('../controllers/accountsController');

// Define common API suffix and prefix
const { app } = require('../config/config');
const { authAdminMiddleware } = require('../middleware/authmiddleware');

const apiSuffix = app.apiPrefix + app.apiVersion;
const prefix = '/account';

// GET /api/v1/account/getaccounts
router.get(`${apiSuffix}${prefix}/getaccounts`, authAdminMiddleware, getAllAccounts);

// POST /api/v1/account/createaccount
router.post(`${apiSuffix}${prefix}/createaccount`, createAccount);

// PUT /api/v1/account/updateaccount/:id
router.put(`${apiSuffix}${prefix}/updateaccount`, updateAccount);

// DELETE /api/v1/account/deleteaccount/:id
router.delete(`${apiSuffix}${prefix}/deleteaccount`, deleteAccount);

module.exports = router;
