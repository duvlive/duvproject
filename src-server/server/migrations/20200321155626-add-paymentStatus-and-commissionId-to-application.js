module.exports = {
  up: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Applications',
        'commissionId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Applications',
        'paid',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Applications',
        'paidOn',
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
  },

  down: async function(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Applications', 'commissionId', {
        transaction
      });
      await queryInterface.removeColumn('Applications', 'paid', {
        transaction
      });
      await queryInterface.removeColumn('Applications', 'paidOn', {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
