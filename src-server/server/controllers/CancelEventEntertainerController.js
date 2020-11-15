import {
  Application,
  CancelEventEntertainer,
  Event,
  EventEntertainer,
  User,
  EntertainerProfile,
} from '../models';
import { getAll } from '../utils';

const CancelEventEntertainerController = {
  /**
   * @desc get global notification
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getCancelEventEntertainers(req, res) {
    const { offset, limit } = req.query;
    try {
      const where = {
        resolved: false,
      };
      const include = [
        {
          model: EventEntertainer,
          as: 'eventEntertainer',
          include: [
            {
              model: Event,
              as: 'event',
              include: [
                {
                  model: User,
                  as: 'owner',
                  attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'email',
                    'profileImageURL',
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Application,
          as: 'eventApplication',
          required: true,
          attributes: [
            'id',
            'commissionId',
            'askingPrice',
            'applicationType',
            'proposedPrice',
            'takeHome',
            'createdAt',
          ],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'profileImageURL'],
              include: [
                {
                  model: EntertainerProfile,
                  as: 'profile',
                  attributes: [
                    'id',
                    'stageName',
                    'entertainerType',
                    'slug',
                    'location',
                  ],
                },
              ],
            },
          ],
        },
      ];
      const options = {
        offset: offset || 0,
        limit: limit || 10,
        include,
        where,
      };
      try {
        const { result, pagination } = await getAll(
          CancelEventEntertainer,
          options
        );
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

export default CancelEventEntertainerController;
