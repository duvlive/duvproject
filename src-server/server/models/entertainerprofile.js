'use strict';
module.exports = function (sequelize, DataTypes) {
  var EntertainerProfile = sequelize.define(
    'EntertainerProfile',
    {
      entertainerType: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: { isIn: [['MC', 'DJ', 'Liveband', null]] },
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
        type: DataTypes.TEXT,
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
        allowNull: true,
      },
      willingToTravel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      eventType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      youTubeChannel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      baseCharges: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      preferredCharges: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      availableFor: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      slug: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      preferredLanguage: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // models.EntertainerProfile.belongsTo(models.User);
        },
      },
    }
  );
  return EntertainerProfile;
};
