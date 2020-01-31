module.exports = {
  up: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Users',
        'referral',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Users',
        'firstTimeLogin',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: true
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
      await queryInterface.removeColumn('Users', 'referral', {
        transaction
      });
      await queryInterface.removeColumn('Users', 'firstTimeLogin', {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
