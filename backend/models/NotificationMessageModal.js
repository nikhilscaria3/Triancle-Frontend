const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/Db');

// Define Notification model
const Notificationmessage = sequelize.define('Notificationmessage', {
    notificationmessage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notifieduser: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    paranoid: true
    // Define additional options here
});

// Export Notification model
module.exports = Notificationmessage;
