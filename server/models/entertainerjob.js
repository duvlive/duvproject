module.exports = (sequelize, DataTypes) => {
  const EntertainerJob = sequelize.define('EntertainerJob', {
    auctionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entertainerType: DataTypes.STRING,
    ageGroup: DataTypes.STRING,
    genre: DataTypes.STRING,
    language: DataTypes.STRING,
    minBudget: DataTypes.INTEGER,
    maxBudget: DataTypes.INTEGER,
    specialRequest: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        EntertainerJob.belongsTo(models.Auction, {
          foreignKey: 'auctionId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return EntertainerJob;
};