'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn(
        'Ratings',
        'professionalism',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Ratings',
        'accommodating',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Ratings',
        'overallTalent',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Ratings',
        'recommend',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
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
        'Ratings',
        'professionalism',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Ratings',
        'accommodating',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Ratings',
        'overallTalent',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        {
          transaction,
        }
      );

      await queryInterface.changeColumn(
        'Ratings',
        'recommend',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
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
