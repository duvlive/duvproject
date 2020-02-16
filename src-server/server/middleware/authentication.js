import jwt from 'jsonwebtoken';
import { User } from '../models';
import { userAssociatedModels } from '../controllers/UserController';
import { USER_TYPES } from '../constant';

const authentication = {
  verifyToken(request, response, next) {
    let token =
      request.headers.authorization || request.headers['x-access-token'];
    if (!token)
      return response.status(401).send({
        message: 'Token required for this route'
      });
    const tokenArray = token.split(' ');
    token = tokenArray.length > 1 ? tokenArray[1] : token;
    if (token) {
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
          return response.status(401).send({
            message: 'Invalid token'
          });
        }
        request.decoded = decoded;
        User.findOne({
          where: { id: request.decoded.userId },
          include: userAssociatedModels
        }).then(user => {
          if (!user) {
            return response.status(401).send({
              message: 'User not found'
            });
          } else {
            request.user = user;
            next();
          }
        });
      });
    } else {
      return response.status(401).send({
        message: 'Token required for access'
      });
    }
  },

  /**
   * generateToken generates token for authentication
   * @param {Object} user object
   * @returns {Object} jwt
   */
  generateToken(user, isLimitedExpiry = false) {
    const signData = {
      userId: user.id,
      type: user.type
    };
    return isLimitedExpiry
      ? jwt.sign(signData, process.env.SECRET)
      : jwt.sign(signData, process.env.SECRET, { expiresIn: '30 day' });
  },

  /**
   * validateAdmin
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   * @returns {Object} response message
   */
  validateAdmin(request, response, next) {
    return request.user.type === USER_TYPES.ADMINISTRATOR
      ? next()
      : response.status(401).send({
          message: 'Not authorized to non-Admin'
        });
  },

  /**
   * validateEntertainer
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   * @returns {Object} response message
   */
  validateEntertainer(request, response, next) {
    return request.user.type === USER_TYPES.ENTERTAINER
      ? next()
      : response.status(401).send({
          message: 'Not authorized to non-entertainers'
        });
  },

  /**
   * validateUser
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   * @returns {Object} response message
   */
  validateUser(request, response, next) {
    return request.user.type === USER_TYPES.USER
      ? next()
      : response.status(401).send({
          message: 'Not authorized to non-users'
        });
  },

  /**
   * isActiveUser
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   * @returns {Object} response message
   */
  isActiveUser(request, response, next) {
    return request.user.isActive
      ? next()
      : response.status(403).send({
          message: 'User needs to activate account'
        });
  }
};
export default authentication;
