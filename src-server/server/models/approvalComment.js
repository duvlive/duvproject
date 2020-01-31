'use strict';
module.exports = function(sequelize, DataTypes) {
  var ApprovalComment = sequelize.define(
    'ApprovalComment',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      entertainerProfile: {
        type: DataTypes.STRING,
      },
      bankAccount: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      identification: {
        type: DataTypes.STRING,
      },
      youTube: {
        type: DataTypes.STRING,
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          // models.ApprovalComment.belongsTo(models.User);
        }
      }
    }
  );
  return ApprovalComment;
};
