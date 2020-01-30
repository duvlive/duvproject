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
        allowNull: false,
        defaultValue: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.Gallery.belongsTo(models.User);
          Gallery.belongsTo(models.User, {
            foreignKey: 'userId'
          });
        }
      }
    }
  );
  return Gallery;
};
