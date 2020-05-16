'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('CancelEventEntertainers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      amount: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      eventEntertainerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      cancelledBy: {
        // use to separate user / entertainer cancelled event details
        type: Sequelize.STRING,
        allowNull: false,
      },
      cancelledDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cancelledReason: {
        type: Sequelize.TEXT,
      },
      refundEventOwner: {
        // amount the owner will receive
        type: Sequelize.STRING,
      },
      eventOwnerRefunded: {
        type: Sequelize.BOOLEAN,
      },
      refundEventOwnerDate: {
        type: Sequelize.DATE,
      },
      payEntertainerDiscount: {
        //amount the entertainer will receive
        type: Sequelize.STRING,
      },
      entertainerPaid: {
        type: Sequelize.BOOLEAN,
      },
      paidEntertainerOn: {
        type: Sequelize.DATE,
      },
      resolved: {
        type: Sequelize.BOOLEAN,
      },
      resolvedBy: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('CancelEventEntertainers');
  },
};
