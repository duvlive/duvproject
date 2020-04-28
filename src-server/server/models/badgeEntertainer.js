'use strict';
module.exports = function (sequelize, DataTypes) {
  var BadgeUser = sequelize.define(
    'BadgeUser',
    {
      badgeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // models.BadgesEntertainer.belongsTo(models.User);
        },
      },
    }
  );
  return BadgeUser;
};
