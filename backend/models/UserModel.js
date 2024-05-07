// Define the necessary imports
const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/Db');

// Define the User model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Change allowNull to false for required fields
        defaultValue: '' // Set a default empty string
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Change allowNull to false for required fields
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false, // Change allowNull to false for required fields
        defaultValue: '' // Set a default empty string
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Change allowNull to false for required fields
        defaultValue: '' // Set a default empty string
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: true, // Change allowNull to true
        references: {
            model: 'Roles',
            key: 'id'
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
    },

    favFileIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Define favFileIds as an array of integers
        allowNull: true, // Set allowNull to true if the column can have null values
        defaultValue: [] // Provide a default value for the column
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // Change allowNull to false for required fields
        defaultValue: true // Set a default value for status
    }
}, {
    paranoid: true // Activate paranoid mode for soft deletion
});


// Define the Role model
const Role = sequelize.define('Role', {
    roletype: {
        type: DataTypes.STRING,
        allowNull: false // Change allowNull to false for required fields
    },
});

// Define associations
User.belongsTo(Role, { foreignKey: 'role' });

module.exports = { User, Role };
