const express = require('express');
const router = express.Router();
const { app } = require('../config/config');
const { searchtags } = require('../controllers/searchController');
const { notificationmessage } = require('../controllers/notificationController');

const apiSuffix = app.apiPrefix + app.apiVersion;
const prefix = '/search';


router.get(`${apiSuffix}${prefix}/searchtags`, searchtags);

//notification

router.get(`${apiSuffix}/notification/notificationmessage`, notificationmessage);


module.exports = router