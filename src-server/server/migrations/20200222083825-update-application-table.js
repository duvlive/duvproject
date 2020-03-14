'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Applications',
        'applicationType',
        {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'Bid',
          validate: { isIn: [['Bid', 'Request', null]] }
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Applications',
        'expiryDate',
        {
          type: Sequelize.DATE,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Applications',
        'approvedDate',
        {
          type: Sequelize.DATE,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Applications',
        'rejectionReason',
        {
          type: Sequelize.TEXT,
          allowNull: true
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'Applications',
        'rejectionDate',
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
      await queryInterface.removeColumn('Applications', 'applicationType', {
        transaction
      });

      await queryInterface.removeColumn('Applications', 'expiryDate', {
        transaction
      });

      await queryInterface.removeColumn('Applications', 'approvedDate', {
        transaction
      });

      await queryInterface.removeColumn('Applications', 'rejectionReason', {
        transaction
      });

      await queryInterface.removeColumn('Applications', 'rejectionDate', {
        transaction
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
