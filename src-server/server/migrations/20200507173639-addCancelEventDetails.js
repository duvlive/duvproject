module.exports = {
  up: async function (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Events',
        'cancelled',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Events',
        'cancelledDate',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Events',
        'cancelledReason',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EventEntertainers',
        'cancelled',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EventEntertainers',
        'cancelledDate',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EventEntertainers',
        'cancelledReason',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async function (queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Events', 'cancelled', {
        transaction,
      });
      await queryInterface.removeColumn('Events', 'cancelledDate', {
        transaction,
      });
      await queryInterface.removeColumn('Events', 'cancelledReason', {
        transaction,
      });

      await queryInterface.removeColumn('EventEntertainers', 'cancelled', {
        transaction,
      });
      await queryInterface.removeColumn('EventEntertainers', 'cancelledDate', {
        transaction,
      });
      await queryInterface.removeColumn(
        'EventEntertainers',
        'cancelledReason',
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
