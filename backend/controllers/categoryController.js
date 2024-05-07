// controllers/categoryController.js

const { Op, where } = require("sequelize");
const { Category } = require('../models/CategoryModal');
const { Subcategory } = require('../models/SubCategoryModal');

exports.getAllCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // get the page number from query params or set it to 1 if it's not provided
        const limit = parseInt(req.query.limit) || 5; // get the number of records per page from query params or set it to 5 if it's not provided
        const offset = (page - 1) * limit; // calculate the offset
        const searchterm = req.query.searchQuery; // Extract search query from request query parameters

        const options = {
            limit: limit,
            offset: offset,
            order: [['updatedAt', 'DESC']], // Order by updatedAt in descending order
        };

        // If there is a search query, add it to the options
        if (searchterm) {
            options.where = {
              // Customize this condition according to your needs
              [Op.or]: [
                { category: { [Op.iLike]: `%${searchterm}%` } },
                // Add more fields to search if needed
              ],
            };
          }
      

        const categoryoptions = {
            limit: limit,
            offset: offset,
            order: [['updatedAt', 'DESC']],
            where: { status: true } // Filter by status = true
        };

        //For Category Page
        const categories = await Category.findAndCountAll( options);

        //For File Page
        const categoriesbystatus = await Category.findAndCountAll(categoryoptions);

        res.json({
            totalPages: Math.ceil(categories.count / limit),
            categories: categories.rows,
            categoriesbystatus: categoriesbystatus.rows
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.createCategory = async (req, res) => {
    const { category: categoryName, description, status } = req.body; // Extracting title, description, and status from the request body
    console.log(categoryName);
    try {
        // Check if a category with the same title already exists
        const existingCategory = await Category.findOne({ where: { category: categoryName } });
        if (existingCategory) {
            return res.status(400).json({ error: "Category already exists" }); // Return a 400 error if the category already exists
        }

        // Create a new category record in the database
        const newCategory = await Category.create({
            category: categoryName,
            description: description,
            status: status
        });

        res.status(201).json({ message: "Category created successfully", category: newCategory }); // Return a success message along with the created category
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateCategory = async (req, res) => {
    const { id, category: categoryName, description, status } = req.body; // Extracting title, description, and status from the request body
    console.log(categoryName);
    try {
        // Check if a category with the specified id exists
        const existingCategory = await Category.findByPk(id);
        if (!existingCategory) {
            return res.status(400).json({ error: "Category does not exist" }); // Return a 400 error if the category does not exist
        }

        // Update the existing category record in the database
        await existingCategory.update({
            category: categoryName,
            description: description,
            status: status
        });

        res.status(200).json({ message: "Category updated successfully", category: existingCategory }); // Return a success message along with the updated category
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteCategory = async (req, res) => {
    const { storedID } = req.query;
    console.log(storedID);
    try {
        const category = await Category.findByPk(storedID); // Include associated subcategories
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const subcategory = await Subcategory.findAll({ where: { categoryid: storedID } })

        // Check if there are associated subcategories
        if (subcategory.length > 0) {
            return res.status(400).json({ error: 'Category cannot be deleted because it has associated subcategories' });
        }

        // If no associated subcategories, proceed with deletion
        await category.destroy();
        res.status(204).json({ message: "Deleted Successfully" });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

