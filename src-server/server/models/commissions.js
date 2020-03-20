'use strict';
module.exports = function(sequelize, Sequelize) {
  var Commission = sequelize.define(
    'Commission',
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      recommendationsCommission: {
        type: Sequelize.STRING,
        allowNull: false
      },
      directHireCommission: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bidsCommission: {
        type: Sequelize.STRING,
        allowNull: false
      },
      handlingPercent: {
        type: Sequelize.STRING,
        allowNull: false
      },
      handlingPlus: {
        type: Sequelize.STRING,
        allowNull: false
      },
      default: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // Commission.belongsTo(models.User);
        }
      }
    }
  );
  return Commission;
};
