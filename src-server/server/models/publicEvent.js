'use strict';
module.exports = function (model, Sequelize) {
  var PublicEvent = model.define(
    'PublicEvent',
    {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventDate: {
        type: Sequelize.DATE,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      eventDuration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mainImage: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      venue: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ticket: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // PublicEvent.belongsTo(models.User);
        },
      },
    }
  );
  return PublicEvent;
};
