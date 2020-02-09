'use strict';
module.exports = function(sequelize, DataTypes) {
  var EventEntertainer = sequelize.define(
    'EventEntertainer',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      entertainerType: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: { isIn: [['MC', 'DJ', 'Liveband', null]] }
      },
      placeOfEvent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
      },
      language: {
        type: DataTypes.STRING,
      },
      expectedAudienceSize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ageGroup: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lowestBudget: {
        type: DataTypes.STRING,
        allowNull: false
      },
      highestBudget: {
        type: DataTypes.STRING,
        allowNull: false
      },
      specialRequest: {
        type: DataTypes.TEXT,
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.EventEntertainer.belongsTo(models.User);
        }
      }
    }
  );
  return EventEntertainer;
};
