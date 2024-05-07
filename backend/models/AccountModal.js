const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/Db');
const { User } = require('./UserModel');

const Account = sequelize.define('Account', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    managerID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Change allowNull to true
        references: {
            model: 'User',
            key: 'id'
        }
    },
    location: DataTypes.STRING,
    projectID: {
        type: DataTypes.STRING,
    },
    type: DataTypes.STRING,
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [] // Default value for tags array
    } 
}, {
    paranoid: true, // Enable soft deletion
});


Account.belongsTo(User, { foreignKey: 'managerID' });


module.exports = {
    Account
};
