'use strict';

module.exports = {
  up: async function (queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn(
        'EntertainerProfiles',
        'baseCharges',
        {
          type: 'INTEGER USING CAST("baseCharges" as INTEGER)',
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'EntertainerProfiles',
        'preferredCharges',
        {
          type: 'INTEGER USING CAST("preferredCharges" as INTEGER)',
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
        'EntertainerProfiles',
        'baseCharges',
        {
          type: 'VARCHAR USING CAST("baseCharges" as VARCHAR)',
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'EntertainerProfiles',
        'preferredCharges',
        {
          type: 'VARCHAR USING CAST("preferredCharges" as VARCHAR)',
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
