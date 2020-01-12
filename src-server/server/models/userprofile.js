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
      allowNull: false,
      defaultValue: false,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stageName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearStarted: {
      type: DataTypes.STRING,
      allowNull: true
    },
    willingToTravel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    youTubeChannel: {
      type: DataTypes.STRING,
      allowNull: true
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