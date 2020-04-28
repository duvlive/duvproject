'use strict';
module.exports = function (sequelize, DataTypes) {
  var Badge = sequelize.define(
    'Badge',
    {
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // models.Badge.belongsTo(models.User);
        },
      },
    }
  );
  return Badge;
};
