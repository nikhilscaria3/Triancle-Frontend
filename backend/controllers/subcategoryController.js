// controllers/subcategoryController.js

const { Op, where } = require("sequelize");
const { Subcategory } = require('../models/SubCategoryModal');
const { Category } = require("../models/CategoryModal");

exports.getAllSubcategories = async (req, res) => {
    try {
        const categoryId = req.query.categoryId; // Extract the category ID from the request query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const searchterm = req.query.searchQuery; // Extract search query from request query parameters

        if (categoryId) {

            const subcategoryoptions = {
                limit: limit,
                offset: offset,
                order: [['updatedAt', 'DESC']],
                where: { categoryid: categoryId, status: true }// Order by updatedAt in descending order // Filter by status = true
            };

            const getsubcategoriesbystatus = await Subcategory.findAndCountAll(subcategoryoptions);

            res.json({ getsubcategoriesbystatus: getsubcategoriesbystatus.rows });

        } else {

            const options = {
                limit: limit,
                offset: offset,
                order: [['updatedAt', 'DESC']],
                include: Category
            };

            // If there is a search query, add it to the options
            if (searchterm) {
                options.where = {
                    // Customize this condition according to your needs
                    [Op.or]: [
                        { subcategory: { [Op.iLike]: `%${searchterm}%` } },
                        // Add more fields to search if needed
                    ],
                };
            }

            const subcategories = await Subcategory.findAndCountAll(options);


            res.json({
                totalPages: Math.ceil(subcategories.count / limit),
                subcategories: subcategories.rows,

            });
        }
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createSubcategory = async (req, res) => {
    const { categoryId, subcategory, description, status } = req.body; // Extracting categoryId, subcategory, description, and status from the request body
    console.log(categoryId);
    try {
        // Check if a subcategory with the same name already exists
        const existingSubcategory = await Subcategory.findOne({ where: { subcategory: subcategory } });
        if (existingSubcategory) {
            return res.status(400).json({ error: "Subcategory already exists" }); // Return a 400 error if the subcategory already exists
        }

        // Create a new subcategory record in the database
        const newSubcategory = await Subcategory.create({
            categoryid: categoryId,
            subcategory: subcategory,
            description: description,
            status: status
        });

        res.status(201).json({ message: "Subcategory created successfully", subcategory: newSubcategory }); // Return a success message along with the created subcategory
    } catch (error) {
        console.error('Error creating subcategory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateSubcategory = async (req, res) => {
    const { id, subcategory, description, status } = req.body; // Extracting subcategory, description, and status from the request body
    console.log(subcategory);
    try {
        // Check if a subcategory with the specified id exists
        const existingSubCategory = await Subcategory.findByPk(id);
        if (!existingSubCategory) {
            return res.status(400).json({ error: "Subcategory does not exist" }); // Return a 400 error if the subcategory does not exist
        }

        // Update the existing subcategory record in the database
        await existingSubCategory.update({
            subcategory: subcategory,
            description: description,
            status: status
        });

        res.status(200).json({ message: "Subcategory updated successfully", subcategory: existingSubCategory }); // Return a success message along with the updated subcategory
    } catch (error) {
        console.error('Error updating subcategory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.deleteSubcategory = async (req, res) => {
    const subcategoryId = req.params.id;
    try {
        const subcategory = await Subcategory.findByPk(subcategoryId);
        if (!subcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        await subcategory.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting subcategory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
