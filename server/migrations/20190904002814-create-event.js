module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
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
      type: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
      },
      title: {
        type: Sequelize.STRING
      },
      street1: {
        type: Sequelize.STRING
      },
      street2: {
        type: Sequelize.STRING
      },
      lga: {
        type: Sequelize.STRING
      },
      landmark: {
        type: Sequelize.STRING
      },
      state: {
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
    return queryInterface.dropTable('Events');
  }
};