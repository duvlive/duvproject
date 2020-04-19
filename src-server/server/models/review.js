'use strict';
module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define(
    'Review',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      entertainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ratingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        },
      },
    }
  );
  return Review;
};
