module.exports = {
  up: (queryInterface, Sequelize) =>{
    return queryInterface.createTable('Bids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      auctionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Auctions',
          key: 'id',
          as: 'auctionId',
        },
      },
      entertainmentType: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      accepted: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, /*Sequelize*/) => {
    return queryInterface.dropTable('Bids');
  }
};