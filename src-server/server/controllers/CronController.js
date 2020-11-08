import { Cron } from '../models';
import { getAll } from '../utils';

const CronController = {
  /**
   * @desc get global notification
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getCrons(req, res) {
    const { offset, limit } = req.query;
    try {
      const options = {
        offset: offset || 0,
        limit: limit || 10,
      };
      try {
        const { result, pagination } = await getAll(Cron, options);
        return res.status(200).json({
          result,
          pagination,
        });
      } catch (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },
};

export default CronController;
