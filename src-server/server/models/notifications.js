'use strict';
module.exports = function (sequelize, DataTypes) {
  var Notification = sequelize.define(
    'Notification',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      actionId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
