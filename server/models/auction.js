module.exports = (sequelize, DataTypes) => {
  const Auction = sequelize.define('Auction', {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    minBidPrice: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Auction.belongsTo(models.Event, {
          foreignKey: 'eventId',
          onDelete: 'CASCADE',
        });
        Auction.hasMany(models.EntertainerJob, {
          foreignKey: 'auctionId',
          onDelete: 'CASCADE',
        });
        Auction.hasMany(models.Bid, {
          foreignKey: 'auctionId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Auction;
};