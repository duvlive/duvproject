module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: DataTypes.STRING,
    details: DataTypes.TEXT,
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    lga: DataTypes.STRING,
    landmark: DataTypes.STRING,
    state: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Event.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        Event.hasOne(models.Auction);
      }
    }
  });
  return Event;
};