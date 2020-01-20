module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Identifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      idType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      issueDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expiryDate: {
        type: Sequelize.STRING,
        allowNull: false
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
  down: (queryInterface /*Sequelize*/) => {
    return queryInterface.dropTable('Identifications');
  }
};
