'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Ratings',
        'eventId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Reviews',
        'eventId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction }
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
      await queryInterface.removeColumn(
        'Ratings',
        'eventId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.removeColumn(
        'Reviews',
        'eventId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
