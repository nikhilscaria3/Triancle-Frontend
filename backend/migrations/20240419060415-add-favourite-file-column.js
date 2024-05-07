'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Files', 'favouriteFile', {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // Optional: Set default value if needed
      allowNull: true,    // Optional: Set allowNull to false if the column is required
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Files', 'favouriteFile');
  }
};
