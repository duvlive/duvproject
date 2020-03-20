'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Commissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      recommendationsCommission: {
        type: Sequelize.STRING,
        allowNull: false
      },
      directHireCommission: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bidsCommission: {
        type: Sequelize.STRING,
        allowNull: false
      },
      handlingPercent: {
        type: Sequelize.STRING,
        allowNull: false
      },
      handlingPlus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      default: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('Commissions');
  }
};
