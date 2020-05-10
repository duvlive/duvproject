'use strict';
module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define(
    'Event',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3,
        },
      },
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      eventDuration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      moreInformation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      streetLine1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      streetLine2: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lga: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cancelled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cancelledDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cancelledReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // models.Event.belongsTo(models.User);
        },
      },
    }
  );
  return Event;
};
