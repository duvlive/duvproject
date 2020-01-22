'use strict';
module.exports = function(sequelize, DataTypes) {
  var BankDetail = sequelize.define(
    'BankDetail',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      accountName: {
        type: DataTypes.STRING,
      },
      bankName: {
        type: DataTypes.STRING,
      },
      accountNumber: {
        type: DataTypes.STRING,
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.BankDetail.belongsTo(models.User);
        }
      }
    }
  );
  return BankDetail;
};
