import jwt from 'jsonwebtoken';
import { User } from '../models';

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
				User.findOne({ where: { id: request.decoded.userId } }).then(x => {
					request.user = x;
					next();
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
		User.findOne({
			where: { type: request.decoded.type }
		})
			.then(user => {
				if (user.type === 3) {
					next();
				} else {
					response.status(401).send({
						error: 'Not authorized to non-Admin'
					});
				}
			})
			.catch(error => {
				response.status(500).send({
					errors: error
				});
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
		User.findOne({
			where: { type: request.decoded.type }
		})
			.then(user => {
				if (user.type === 2) {
					next();
				} else {
					response.status(401).send({
						error: 'Not authorized to non-entertainers'
					});
				}
			})
			.catch(error => {
				response.status(500).send({
					errors: error
				});
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
		User.findOne({
			where: { type: request.decoded.type }
		})
			.then(user => {
				if (user.type === 1) {
					next();
				} else {
					response.status(401).send({
						error: 'Not authorized to non-users'
					});
				}
			})
			.catch(error => {
				response.status(500).send({
					errors: error
				});
			});
	}
};
export default authentication;
