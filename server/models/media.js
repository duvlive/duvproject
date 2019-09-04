module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Media.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Media;
};