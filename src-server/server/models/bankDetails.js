'use strict';
module.exports = function(sequelize, DataTypes) {
  var BankDetail = sequelize.define('BankDetail', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // models.BankDetail.belongsTo(models.User);
      }
    }
  });
  return BankDetail;
};