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

  async getOneCancelEventEntertainers(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        message: 'Id needed to view details',
      });
    }

    CancelEventEntertainer.findOne({
      where: {
        id,
      },
      include: [
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
                    'phoneNumber',
                    'phoneNumber2',
                    'email',
                    'profileImageURL',
                    'accountName',
                    'accountNumber',
                    'bankName',
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
      ],
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        return res.json({ event });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * Resolve User refund
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  resolveUserRefund(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    CancelEventEntertainer.findOne({
      where: { id },
    })
      .then((eventFound) => {
        if (!eventFound || eventFound.length === 0) {
          return res
            .status(404)
            .json({ message: 'Event Entertainer not found' });
        }
        if (eventFound.resolved || eventFound.eventOwnerRefunded) {
          return res.status(403).json({
            message:
              'Event has already been  resolved as event owner has been refunded',
          });
        }

        const resolvedOptions =
          parseInt(eventFound.payEntertainerDiscount, 10) === 0
            ? {
                resolved: true,
                resolvedBy: userId,
              }
            : {};

        return CancelEventEntertainer.update(
          {
            eventOwnerRefunded: true,
            refundEventOwnerDate: new Date().toISOString(),
            ...resolvedOptions,
          },
          {
            where: {
              id,
            },
          }
        ).then(() => {
          // sendMail(EMAIL_CONTENT.WELCOME_MAIL, userFound);
          return res
            .status(200)
            .json({ message: 'Event has been successfully resolved' });
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(500).json({ message: errorMessage });
      });
  },

  /**
   * Resolve Entertainer refund
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  resolveEntertainerRefund(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    CancelEventEntertainer.findOne({
      where: { id },
    })
      .then((eventFound) => {
        if (!eventFound || eventFound.length === 0) {
          return res
            .status(404)
            .json({ message: 'Event Entertainer not found' });
        }
        if (
          eventFound.resolved ||
          parseInt(eventFound.payEntertainerDiscount, 10) === 0
        ) {
          return res.status(403).json({
            message: 'Event has already been resolved for the entertainer',
          });
        }

        const resolvedOptions = eventFound.eventOwnerRefunded
          ? {
              resolved: true,
              resolvedBy: userId,
            }
          : {};

        // TODO:
        // Cancel Performance --> For entertainers
        return CancelEventEntertainer.update(
          {
            entertainerPaid: true,
            paidEntertainerOn: new Date().toISOString(),
            ...resolvedOptions,
          },
          {
            where: {
              id,
            },
          }
        ).then(() => {
          // sendMail(EMAIL_CONTENT.WELCOME_MAIL, userFound);
          return res
            .status(200)
            .json({ message: 'Event has been successfully resolved' });
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(500).json({ message: errorMessage });
      });
  },
};

export default CancelEventEntertainerController;
