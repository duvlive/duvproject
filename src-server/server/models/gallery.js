'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define(
    'Gallery',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      imageURL: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageID: {
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
          // Gallery.belongsTo(models.User);
        }
      }
    }
  );
  return Gallery;
};
