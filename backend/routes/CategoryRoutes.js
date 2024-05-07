// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, deleteCategory, updateCategory } = require('../controllers/categoryController');
const { getAllSubcategories, createSubcategory, deleteSubcategory, updateSubcategory } = require('../controllers/subcategoryController');

// routes/calendarRoutes.js
// Define common API suffix and prefix
const { app } = require('../config/config');

const { authAdminMiddleware } = require('../middleware/authmiddleware');

const apiSuffix = app.apiPrefix + app.apiVersion;
const prefix = '/category';


// Routes for categories

router.get(`${apiSuffix}${prefix}/getcategory`, getAllCategories);
router.post(`${apiSuffix}${prefix}/createcategory`, createCategory);
router.put(`${apiSuffix}${prefix}/updatecategory`, updateCategory);
router.delete(`${apiSuffix}${prefix}/deletecategory`, deleteCategory);

router.get(`${apiSuffix}${prefix}/getsubcategory`, getAllSubcategories);
router.post(`${apiSuffix}${prefix}/createsubcategory`, createSubcategory);
router.put(`${apiSuffix}${prefix}/updatesubcategory`, updateSubcategory);
router.delete(`${apiSuffix}${prefix}/deletesubcategory`, deleteSubcategory);


module.exports = router;
