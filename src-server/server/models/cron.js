'use strict';
module.exports = function (sequelize, DataTypes) {
  var Cron = sequelize.define('Cron', {
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Cron;
};
