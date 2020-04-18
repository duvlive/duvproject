'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn(
        'Events',
        'landmark',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Events',
        'city',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Events',
        'description',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Events',
        'moreInformation',
        {
          type: Sequelize.TEXT,
          allowNull: true,
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
        'Events',
        'landmark',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Events',
        'city',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Events',
        'description',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Events',
        'moreInformation',
        {
          type: Sequelize.TEXT,
          allowNull: true,
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
