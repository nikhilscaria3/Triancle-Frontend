'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Accounts', 'projectID', {
      type: Sequelize.INTEGER,
      allowNull: true // Update with the original column definition
    });
    // Remove the 'manager' column from the 'accounts' table

  },

  down: async (queryInterface, Sequelize) => {
    // Re-add the 'manager' column to the 'accounts' table
    await queryInterface.removeColumn('Accounts', 'projectID');
  }
};
