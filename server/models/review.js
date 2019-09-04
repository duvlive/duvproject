module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    giverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: DataTypes.TEXT,
    rating: DataTypes.NUMBER,
    quality: DataTypes.INTEGER,
    professionalism: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Review.belongsToMany(models.User, {
          foreignKey: 'giverId',
          onDelete: 'CASCADE',
        });
        Review.hasMany(models.User, {
          foreignKey: 'receiverId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Review;
};
