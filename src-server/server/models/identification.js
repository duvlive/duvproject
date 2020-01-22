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
      },
      idNumber: {
        type: DataTypes.STRING,
        validate: {
          min: 3
        }
      },
      issueDate: {
        type: DataTypes.STRING,
      },
      expiryDate: {
        type: DataTypes.STRING,
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
