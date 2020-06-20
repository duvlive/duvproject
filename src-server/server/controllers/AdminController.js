import { User } from '../models';
import { getAll } from '../utils/modelHelper';

const AdminController = {
  /**
   * Get All Registered Users
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */

  async getAllUsers(req, res) {
    const limit = 10;
    const offset = parseInt(req.query.offset, 10) || 0;
    try {
      const { result, pagination } = await getAll(User, {
        limit,
        offset,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'phoneNumber',
          'profileImageURL',
          'type',
          'isActive',
        ],
        order: [['id', 'desc']],
      });
      return res.status(200).json({ users: result, pagination });
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  /**
   * Get All Registered Users
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */

  async getOneUser(req, res) {
    const id = req.query.id;
    try {
      const user = await User.findOne({
        where: { id },
      });
      return res.status(200).json({ user });
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

};

export default AdminController;
