'use strict';
module.exports = function (sequelize, DataTypes) {
  var Payment = sequelize.define(
    'Payment',
    {
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entertainerId: {
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
          // Payment.belongsTo(models.User);
        },
      },
    }
  );
  return Payment;
};
