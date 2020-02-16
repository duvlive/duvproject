'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'EntertainerProfiles',
        'city',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'baseCharges',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '0'
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'preferredCharges',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '0'
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'availableFor',
        {
          type: Sequelize.TEXT,
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
      await queryInterface.removeColumn('EntertainerProfiles', 'city', {
        transaction
      });
      await queryInterface.removeColumn('EntertainerProfiles', 'baseCharges', {
        transaction
      });
      await queryInterface.removeColumn(
        'EntertainerProfiles',
        'preferredCharges',
        {
          transaction
        }
      );
      await queryInterface.removeColumn('EntertainerProfiles', 'availableFor', {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
