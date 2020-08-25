'use strict';
module.exports = function (sequelize, DataTypes) {
  var GlobalNotification = sequelize.define(
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
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // GlobalNotification.belongsTo(models.User);
        },
      },
    }
  );
  return GlobalNotification;
};
