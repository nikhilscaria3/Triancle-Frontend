'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'manager' column from the 'accounts' table
    await queryInterface.removeColumn('Accounts', 'manager');
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add the 'manager' column to the 'accounts' table
    await queryInterface.addColumn('Accounts', 'manager', {
      type: Sequelize.STRING,
      allowNull: true // Update with the original column definition
    });
  }
};
