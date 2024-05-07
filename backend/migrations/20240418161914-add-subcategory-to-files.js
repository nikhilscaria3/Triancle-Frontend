'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Files', 'subcategory', {
      type: Sequelize.STRING,
      allowNull: true // Modify as per your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Files', 'subcategory');
  }
};
