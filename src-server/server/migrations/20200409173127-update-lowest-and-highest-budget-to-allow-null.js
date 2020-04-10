'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn(
        'EventEntertainers',
        'lowestBudget',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'EventEntertainers',
        'highestBudget',
        {
          type: Sequelize.STRING,
          allowNull: true,
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
      await queryInterface.changeColumn(
        'EventEntertainers',
        'lowestBudget',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'EventEntertainers',
        'highestBudget',
        {
          type: Sequelize.STRING,
          allowNull: true,
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
