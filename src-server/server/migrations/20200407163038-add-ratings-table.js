module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      entertainerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      professionalism: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      accommodating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      overallTalent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      recommend: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface /*Sequelize*/) => {
    return queryInterface.dropTable('Ratings');
  },
};
