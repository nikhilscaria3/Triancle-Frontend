'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'favFileIds', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true // You can change this to false if favFileIds should not be null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'favFileIds');
  }
};
