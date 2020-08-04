'use strict';
module.exports = function (sequelize, DataTypes) {
  var Reminder = sequelize.define(
    'Reminder',
    {
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hiredEntertainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ratingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventEntertainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // Reminder.belongsTo(models.User);
        },
      },
    }
  );
  return Reminder;
};
