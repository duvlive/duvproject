'use strict';
module.exports = function(sequelize, DataTypes) {
  var Application = sequelize.define(
    'Application',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Pending',
        validate: { isIn: [['Pending', 'Rejected', 'Approved', null]] }
      },
      askingPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.Application.belongsTo(models.User);
        }
      }
    }
  );
  return Application;
};
