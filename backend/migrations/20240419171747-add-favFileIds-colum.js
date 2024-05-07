'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'favFileIds', {
      type: Sequelize.ARRAY(Sequelize.INTEGER), // Define the column type as an array of integers
      allowNull: true, // Set allowNull to true if the column can have null values
      defaultValue: [] // Provide a default value for the column
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'favFileIds');
  }
};
