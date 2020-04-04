'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('EntertainerProfiles', 'baseCharges', {
        transaction,
      });
      await queryInterface.removeColumn(
        'EntertainerProfiles',
        'preferredCharges',
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'baseCharges',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'EntertainerProfiles',
        'about',
        {
          type: Sequelize.TEXT,
        },
        {
          transaction,
        }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'preferredCharges',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
      await queryInterface.removeColumn('EntertainerProfiles', 'baseCharges', {
        transaction,
      });
      await queryInterface.removeColumn(
        'EntertainerProfiles',
        'preferredCharges',
        { transaction }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'baseCharges',
        {
          type: Sequelize.STRING,
          defaultValue: '0',
        },
        {
          transaction,
        }
      );

      await queryInterface.addColumn(
        'EntertainerProfiles',
        'preferredCharges',
        {
          type: Sequelize.STRING,
          defaultValue: '0',
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
