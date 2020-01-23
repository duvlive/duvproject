'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define(
    'Event',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      eventType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3
        }
      },
      eventDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startTime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      moreInformation: {
        type: DataTypes.TEXT,
        allowNull: false
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
        allowNull: false,
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.Event.belongsTo(models.User);
        }
      }
    }
  );
  return Event;
};
