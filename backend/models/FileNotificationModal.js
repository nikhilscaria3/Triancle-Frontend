const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/Db');
const { File } = require('./FileModal');

const Filenotification = sequelize.define('filenotification', {
    fileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "File",
            key: 'id'
        }
    },
    medium: {
        type: DataTypes.JSONB, // JSON object type for storing JSON data
        allowNull: true // Modify as needed
    },
    endDate: {
        type: DataTypes.DATEONLY, // Date without time
        allowNull: false
    },
    nextNotificationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cronStatus: {
        type: DataTypes.INTEGER,
        defaultValue: 0 // Default value of 0
    },
    status: {
        type: DataTypes.BOOLEAN, // Enum for active or inactive status
        allowNull: false
    },
    NumberofDays: {
        type: DataTypes.INTEGER,
        defaultValue: 0 // Default value of 0
    },
    userId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of user IDs
        allowNull: true,
    },
    // Add paranoid behavior
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    paranoid: true // Enable paranoid behavior
});


// Define association with File model
Filenotification.belongsTo(File, { foreignKey: 'fileId' });

module.exports = {Filenotification};
