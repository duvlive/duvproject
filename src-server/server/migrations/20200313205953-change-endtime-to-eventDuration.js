'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.changeColumn(
        'Events',
        'endTime',
        {
          type: Sequelize.STRING
        },
        {
          transaction
        }
      );

      await queryInterface.renameColumn('Events', 'endTime', 'eventDuration', {
        transaction
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Events', 'eventDuration', {
        transaction
      });

      await queryInterface.addColumn(
        'Events',
        'endTime',
        {
          type: Sequelize.DATE,
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
