// Define the necessary imports
const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/Db');

// Define the User model
const Tag = sequelize.define('tag', {
    tagname: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    }
});

module.exports = { Tag }