'use strict';
module.exports = {
  up: async function (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('GlobalNotification');

      await queryInterface.createTable('GlobalNotifications', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        adminId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        message: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        entertainerType: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        userType: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        startTime: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        endTime: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('GlobalNotifications');
  },
};
