'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'EntertainerProfiles',
        'about',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'stageName',
        {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'location',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'yearStarted',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'willingToTravel',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'eventType',
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
  },

  down: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('EntertainerProfiles', 'about', {
        transaction
      });
      await queryInterface.removeColumn('EntertainerProfiles', 'stageName', {
        transaction
      });
      await queryInterface.removeColumn('EntertainerProfiles', 'location', {
        transaction
      });
      await queryInterface.removeColumn('EntertainerProfiles', 'yearStarted', {
        transaction
      });
      await queryInterface.removeColumn(
        'EntertainerProfiles',
        'willingToTravel',
        {
          transaction
        }
      );
      await queryInterface.removeColumn('EntertainerProfiles', 'eventType', {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
