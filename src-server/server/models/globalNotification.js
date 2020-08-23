'use strict';
module.exports = function (sequelize, DataTypes) {
  var Notification = sequelize.define(
    'GlobalNotification',
    {
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      entertainerType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // Notification.belongsTo(models.User);
        },
      },
    }
  );
  return Notification;
};
