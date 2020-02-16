'use strict';
module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define(
    'Contact',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [11, 14]
        }
      },
      relationship: {
        type: DataTypes.STRING,
        allowNull: true
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.Contact.belongsTo(models.User);
        }
      }
    }
  );
  return Contact;
};
