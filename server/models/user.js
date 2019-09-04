module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    badgeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [11, 14],
      },
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { isIn: [[1, 2, 3]] },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasOne(models.UserProfile);
        User.belongsToMany(models.Badge, {
          foreignKey: 'badgeId',
          onDelete: 'CASCADE',
        });
        User.hasMany(models.Media, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        User.hasMany(models.Event, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        User.hasMany(models.Review, {
          foreignKey: 'receiverId',
          onDelete: 'CASCADE',
        });
        User.hasMany(models.Review, {
          foreignKey: 'giverId',
          onDelete: 'CASCADE',
        });
        User.hasMany(models.Bid, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return User;
};
