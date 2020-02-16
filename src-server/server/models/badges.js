'use strict';
module.exports = function(sequelize, DataTypes) {
  var Badge = sequelize.define(
    'Badge',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.Badge.belongsTo(models.User);
        }
      }
    }
  );
  return Badge;
};
