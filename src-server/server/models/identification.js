'use strict';
module.exports = function(sequelize, DataTypes) {
  var Identification = sequelize.define(
    'Identification',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      idType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3
        }
      },
      issueDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiryDate: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.Identification.belongsTo(models.User);
        }
      }
    }
  );
  return Identification;
};
