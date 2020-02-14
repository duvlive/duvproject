'use strict';
module.exports = function(sequelize, DataTypes) {
  var Video = sequelize.define(
    'Video',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      youtubeURL: {
        type: DataTypes.STRING,
        allowNull: false
      },
      approved: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // Video.belongsTo(models.User);
        }
      }
    }
  );
  return Video;
};
