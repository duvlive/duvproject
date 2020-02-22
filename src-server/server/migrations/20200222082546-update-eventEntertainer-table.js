'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'EventEntertainers',
        'auctionStartDate',
        {
          type: Sequelize.DATE,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EventEntertainers',
        'auctionEndDate',
        {
          type: Sequelize.DATE,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EventEntertainers',
        'hireType',
        {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'Auction',
          validate: { isIn: [['Search', 'Auction', 'Recommendation', null]] }
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EventEntertainers',
        'hiredDate',
        {
          type: Sequelize.DATE,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'EventEntertainers',
        'hiredEntertainer',
        {
          type: Sequelize.INTEGER,
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
      await queryInterface.removeColumn(
        'EventEntertainers',
        'auctionStartDate',
        {
          transaction
        }
      );

      await queryInterface.removeColumn('EventEntertainers', 'auctionEndDate', {
        transaction
      });

      await queryInterface.removeColumn('EventEntertainers', 'hireType', {
        transaction
      });

      await queryInterface.removeColumn('EventEntertainers', 'hiredDate', {
        transaction
      });

      await queryInterface.removeColumn(
        'EventEntertainers',
        'hiredEntertainer',
        {
          transaction
        }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
