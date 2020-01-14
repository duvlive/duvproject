import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import emailSender from '../MailSender';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          min: 6
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [11, 14]
        }
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { isIn: [[1, 2, 3]] }
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      activationToken: {
        type: DataTypes.STRING
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10)
          );
          user.activationToken = jwt.sign(
            {
              userId: user.id,
              type: user.type
            },
            process.env.SECRET
          );
        },
        afterCreate: user => {
          const models = require('./');
          models.UserProfile.create({ userId: user.id })
            .then(res => {
              return user.setProfile(res);
            })
            .then(() => {
              const { email, activationToken } = user;
              return emailSender(email, activationToken);
            })
            .catch(error => {
              console.log(error);
            });
        },
        beforeUpdate: user => {
          user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10)
          );
        }
      }
    },
    {
      classMethods: {
        associate: models => {
          // associations can be defined here
          // User.hasMany(User, {foreignKey: 'userId', as: 'bandMembers'});
          // User.hasOne(models.UserProfile, {foreignKey: 'userId', as: 'profile'});
        }
      }
    }
  );
  return User;
};
