'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserProfile = sequelize.define('UserProfile', {
    entertainerType: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: { isIn: [['MC', 'DJ', 'Liveband', null]]
    },
  },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // models.UserProfile.belongsTo(models.User);
      }
    }
  });
  return UserProfile;
};