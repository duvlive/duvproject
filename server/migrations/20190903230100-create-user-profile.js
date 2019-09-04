module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
      },
      stageName: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.TEXT
      },
      yearsOfExperience: {
        type: Sequelize.INTEGER
      },
      funFact: {
        type: Sequelize.TEXT
      },
      phoneNumber2: {
        type: Sequelize.STRING
      },
      travelAvailability: {
        type: Sequelize.BOOLEAN
      },
      eventInterest: {
        type: Sequelize.STRING
      },
      accountName: {
        type: Sequelize.STRING
      },
      accountNumber: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      verifiedEntertainer: {
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.TEXT
      },
      about: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('UserProfiles');
  }
};