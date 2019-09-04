module.exports = (sequelize, DataTypes) => {
  const Badge = sequelize.define('Badge', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    icon: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Badge.belongsToMany(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Badge;
};