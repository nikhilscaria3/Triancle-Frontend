// Define the Category model
const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/Db');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
    },
    deletedAt: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    paranoid: true
});



module.exports = {
    Category
}