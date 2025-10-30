'use strict';
module.exports = function (sequelize, DataTypes) {
  const GoogleToken = sequelize.define(
    'GoogleToken',
    {
      access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      scope: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      token_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiry_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      tableName: 'GoogleTokens',
      timestamps: true, 
      classMethods: {
        associate: function (models) {
          // No associations yet, but you can link this to a User later if needed.
        },
      },
    }
  );

  return GoogleToken;
};
