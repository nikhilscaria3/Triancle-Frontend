// models/File.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/Db');
const { Account } = require('./AccountModal'); // Corrected typo in import
// const { Filenotification } = require('./FileNotificationModal');
// const { Filenotification } = require('./FileNotificationModal');

const File = sequelize.define('File', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Change allowNull to true if necessary
    references: {
      model: Account, // Use the Account model directly
      key: 'id'
    }
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: true
  },
  favouriteFile: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true
  },
  finalDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  notificationEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  notificationDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: false // I assume you meant defaultValue: null here
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  paranoid: true, // Enable soft deletion
});


// Define association with Account model
//  File.hasOne(Filenotification, { foreignKey: 'fileId' }); // Corrected association
File.belongsTo(Account, { foreignKey: 'accountId' });
// Define the association in the File model

module.exports = {
  File
};
