'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Events', 'startTime', { transaction });
      await queryInterface.removeColumn('Events', 'endTime', { transaction });

      await queryInterface.addColumn(
        'Events',
        'startTime',
        {
          type: Sequelize.DATE
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Events',
        'endTime',
        {
          type: Sequelize.DATE
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Events', 'startTime', { transaction });
      await queryInterface.removeColumn('Events', 'endTime', { transaction });

      await queryInterface.addColumn(
        'Events',
        'startTime',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Events',
        'endTime',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
