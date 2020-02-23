import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from '../MailSender';
import EMAIL_CONTENT from '../email-template/content';

const encryptPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

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
      phoneNumber2: {
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
        validate: { isIn: [[0, 1, 2, 3]] }
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      activationToken: {
        type: DataTypes.STRING
      },
      activatedAt: {
        type: DataTypes.DATE
      },
      referral: {
        type: DataTypes.STRING
      },
      profileImageURL: {
        type: DataTypes.STRING
      },
      profileImageID: {
        type: DataTypes.STRING
      },
      firstTimeLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          user.password = encryptPassword(user.password);
          user.activationToken = jwt.sign(
            {
              userId: user.id,
              type: user.type
            },
            process.env.SECRET
          );
          user.referral = Date.now()
            .toString(36)
            .slice(-5);
        },
        afterCreate: user => {
          const models = require('./');
          const link = `${process.env.HOST}/activate/${user.activationToken}`;
          sendMail(EMAIL_CONTENT.ACTIVATE_YOUR_ACCOUNT, user, {
            link
          })
            .then(() => {
              const indentityInformation = () =>
                [
                  'EntertainerProfile',
                  'BankDetail',
                  'Identification',
                  'ApprovalComment'
                ].map(model => models[model].create({ userId: user.id }));
              if (user.type === 2) {
                return Promise.all(indentityInformation());
              }
              return Promise.resolve(null);
            })
            .catch(error => {
              console.log(error);
            });
        },
        beforeUpdate: user => {
          if (user.changed('password')) {
            user.password = encryptPassword(user.password);
          }
        }
      }
    },
    {
      classMethods: {
        associate: models => {
          // associations can be defined here
          // User.hasMany(User, {foreignKey: 'userId', as: 'bandMembers'});
          // User.hasOne(models.EntertainerProfile, {foreignKey: 'userId', as: 'profile'});
          // console.log('models', models);
          // User.hasMany(models.Gallery, {
          //   foreignKey: 'userId',
          //   onDelete: 'CASCADE',
          //   hooks: true
          // });
        }
      }
    }
  );
  return User;
};
