'use strict';
module.exports = function (sequelize, DataTypes) {
  var CancelEventEntertainer = sequelize.define(
    'CancelEventEntertainer',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventEntertainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cancelledBy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User',
        validate: {
          isIn: [['User', 'Entertainer']],
        },
      },
      cancelledDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cancelledReason: {
        type: DataTypes.TEXT,
      },
      refundEventOwner: {
        type: DataTypes.STRING,
      },
      eventOwnerRefunded: {
        type: DataTypes.BOOLEAN,
      },
      refundEventOwnerDate: {
        type: DataTypes.DATE,
      },
      payEntertainerDiscount: {
        type: DataTypes.STRING,
      },
      entertainerPaid: {
        type: DataTypes.BOOLEAN,
      },
      paidEntertainerOn: {
        type: DataTypes.DATE,
      },
      resolved: {
        type: DataTypes.BOOLEAN,
      },
      resolvedBy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // models.CancelEventEntertainer.belongsTo(models.User);
        },
      },
    }
  );
  return CancelEventEntertainer;
};
