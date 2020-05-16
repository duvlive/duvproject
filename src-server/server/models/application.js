'use strict';
module.exports = function (sequelize, DataTypes) {
  var Application = sequelize.define(
    'Application',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventEntertainerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Pending',
        validate: {
          isIn: [
            [
              'Pending',
              'Rejected',
              'Approved',
              'Increment',
              'Paid',
              'Cancelled',
              null,
            ],
          ],
        },
      },
      askingPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicationType: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Bid',
        validate: { isIn: [['Bid', 'Request', null]] },
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      approvedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rejectionReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rejectionDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      commissionId: { type: DataTypes.INTEGER, allowNull: true },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      paidOn: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      proposedPrice: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      takeHome: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // models.Application.belongsTo(models.User);
        },
      },
    }
  );
  return Application;
};
