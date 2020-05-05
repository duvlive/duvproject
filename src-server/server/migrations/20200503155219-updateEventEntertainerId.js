'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Payments', 'eventEntertainerId', {
        transaction,
      });

      await queryInterface.addColumn(
        'Payments',
        'eventEntertainerId',
        {
          type: Sequelize.INTEGER,
        },
        {
          transaction,
        }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async function (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Payments', 'eventEntertainerId', {
        transaction,
      });

      await queryInterface.addColumn(
        'Payments',
        'eventEntertainerId',
        {
          type: Sequelize.STRING,
        },
        {
          transaction,
        }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
