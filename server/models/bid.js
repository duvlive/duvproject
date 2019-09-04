module.exports = function(sequelize, DataTypes) {
  const Bid = sequelize.define('Bid', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    auctionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entertainmentType: DataTypes.STRING,
    amount: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        Bid.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        Bid.belongsTo(models.Auction, {
          foreignKey: 'auctionId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Bid;
};