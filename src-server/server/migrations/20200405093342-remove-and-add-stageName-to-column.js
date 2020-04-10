module.exports = {
  up: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('EntertainerProfiles');

      await queryInterface.createTable('EntertainerProfiles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        entertainerType: {
          type: Sequelize.STRING
        },
        approved: {
          type: Sequelize.BOOLEAN
        },
        about: {
          allowNull: true,
          type: Sequelize.STRING
        },
        stageName: {
          allowNull: true,
          type: Sequelize.STRING
        },
        location: {
          allowNull: true,
          type: Sequelize.STRING
        },
        yearStarted: {
          allowNull: true,
          type: Sequelize.STRING
        },
        willingToTravel: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        eventType: {
          type: Sequelize.STRING,
          allowNull: true
        },
        youTubeChannel: {
          type: Sequelize.STRING,
          allowNull: true
        },
        city: {
          type: Sequelize.STRING,
          allowNull: true
        },
        baseCharges: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '0'
        },
        preferredCharges: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '0'
        },
        availableFor: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: true
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

      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw err;
    }
  },

  down: async function(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('EntertainerProfiles');

      await queryInterface.createTable('EntertainerProfiles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        entertainerType: {
          type: Sequelize.STRING
        },
        approved: {
          type: Sequelize.BOOLEAN
        },
        about: {
          allowNull: true,
          type: Sequelize.STRING
        },
        stageName: {
          allowNull: true,
          type: Sequelize.STRING,
          unique: true
        },
        location: {
          allowNull: true,
          type: Sequelize.STRING
        },
        yearStarted: {
          allowNull: true,
          type: Sequelize.STRING
        },
        willingToTravel: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        eventType: {
          type: Sequelize.STRING,
          allowNull: true
        },
        youTubeChannel: {
          type: Sequelize.STRING,
          allowNull: true
        },
        city: {
          type: Sequelize.STRING,
          allowNull: true
        },
        baseCharges: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '0'
        },
        preferredCharges: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '0'
        },
        availableFor: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: true
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

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
