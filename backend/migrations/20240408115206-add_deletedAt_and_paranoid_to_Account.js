'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Accounts', 'deletedAt', {
            type: Sequelize.DATE,
            allowNull: true,
        });

        await queryInterface.sequelize.query('ALTER TABLE "Accounts" ENABLE ROW LEVEL SECURITY;');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Accounts', 'deletedAt');
    }
};
