'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Files', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        allowNull: true,
        references: {
          model: 'Accounts',
          key: 'id'
        }
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
        defaultValue: null // Changed to null
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
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Files');
  }
};
