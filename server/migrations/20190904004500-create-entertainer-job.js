module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EntertainerJobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      entertainerType: {
        type: Sequelize.STRING
      },
      ageGroup: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      minBudget: {
        type: Sequelize.INTEGER
      },
      maxBudget: {
        type: Sequelize.INTEGER
      },
      specialRequest: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('EntertainerJobs');
  }
};