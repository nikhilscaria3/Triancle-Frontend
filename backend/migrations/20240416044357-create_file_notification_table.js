'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('filenotifications', 'NumberofDays', {
      type: Sequelize.INTEGER,
      defaultValue: 0 // Corrected property name and value
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('filenotifications', 'NumberofDays'); // Specify the column name to remove
  }
};
