'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ApprovalComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      entertainerProfile: {
        type: Sequelize.STRING,
      },
      bankAccount: {
        type: Sequelize.STRING,
      },
      contact: {
        type: Sequelize.STRING,
      },
      identification: {
        type: Sequelize.STRING,
      },
      youTube: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ApprovalComments');
  }
};
