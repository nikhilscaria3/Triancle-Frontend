'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Accounts', 'projectID', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Accounts', 'projectID', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
