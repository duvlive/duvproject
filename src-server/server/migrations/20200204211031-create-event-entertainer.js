'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('EventEntertainers', {
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
      eventId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      entertainerType: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        validate: { isIn: [['MC', 'DJ', 'Liveband', null]] }
      },
      placeOfEvent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      genre: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      expectedAudienceSize: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ageGroup: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lowestBudget: {
        type: Sequelize.STRING,
        allowNull: false
      },
      highestBudget: {
        type: Sequelize.STRING,
        allowNull: false
      },
      specialRequest: {
        type: Sequelize.STRING
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
  down: function(queryInterface) {
    return queryInterface.dropTable('EventEntertainers');
  }
};
