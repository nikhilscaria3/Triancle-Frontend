'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Adjust allowNull as needed
        references: {
          model: 'Accounts', // Make sure the Accounts table exists
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file: {
        type: Sequelize.STRING,
        allowNull: true
      },
      finalDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      notificationEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      notificationDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null // Corrected defaultValue
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Files');
  }
};
