'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the deletedAt column to the Users table
    await queryInterface.addColumn('Users', 'deletedAt', {
      type: Sequelize.DATE
    });

    // Create an index on the deletedAt column for better performance
    await queryInterface.addIndex('Users', ['deletedAt']);

    // Enable paranoid mode for the Users table
    await queryInterface.addColumn('Users', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the deletedAt column from the Users table
    await queryInterface.removeColumn('Users', 'deletedAt');
  }
};
