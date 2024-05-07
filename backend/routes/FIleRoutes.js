// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/FileController');
const { app } = require('../config/config');

// Define common API suffix and prefix

const apiSuffix = app.apiPrefix + app.apiVersion;
const prefix = '/file';


const multer = require('multer');
const { authMiddleware } = require('../middleware/authmiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/admin/files
router.post(`${apiSuffix}${prefix}/createfile`, upload.single("file"), fileController.addFile);

// GET /api/admin/files
router.get(`${apiSuffix}${prefix}/getfiles`, authMiddleware, fileController.getFiles);

// PUT /api/admin/files/:id
router.put(`${apiSuffix}${prefix}/updatefile`, upload.single("file"), fileController.updateFile);

// DELETE /api/admin/files/:id
router.delete(`${apiSuffix}${prefix}/deletefile`, fileController.deleteFile);

// Save Fav /api/admin/files/:id
router.post(`${apiSuffix}${prefix}/savefav`, authMiddleware, fileController.addFavoriteFile);

router.post(`${apiSuffix}${prefix}/removefav`, authMiddleware, fileController.removeFavoriteFile);

router.get(`${apiSuffix}${prefix}/getassignfile`, authMiddleware, fileController.getAssignedFiles);

module.exports = router;
