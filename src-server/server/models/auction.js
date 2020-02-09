'use strict';
module.exports = function(sequelize, DataTypes) {
  var Auction = sequelize.define(
    'Auction',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      minimumAmount: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.Auction.belongsTo(models.User);
        }
      }
    }
  );
  return Auction;
};
