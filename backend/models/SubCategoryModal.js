// Define the Category model
const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/Db');
const { Category } = require('./CategoryModal');

// Define the Subcategory model
const Subcategory = sequelize.define('Subcategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryid: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category',
            key: 'id'
        },
    },
    subcategory: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    deletedAt: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    paranoid: true
});


Subcategory.belongsTo(Category, { foreignKey: 'categoryid' });

module.exports = {
    Subcategory
}