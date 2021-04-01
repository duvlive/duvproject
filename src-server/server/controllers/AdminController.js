import Sequelize, { Op } from 'sequelize';
import {
  Application,
  User,
  Badge,
  BadgeUser,
  Rating,
  Event,
  EntertainerProfile,
  Gallery,
  Video,
  EventEntertainer,
  BankDetail,
  Contact,
  Identification,
  ApprovalComment,
  CancelEventEntertainer,
  Commission,
  Payment,
} from '../models';
import { EVENT_HIRETYPE, REQUEST_ACTION } from '../constant';
import { addDays } from 'date-fns';
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
      const include = [
        {
          model: Event,
          as: 'events',
          include: [
            {
              model: EventEntertainer,
              as: 'entertainers',
              include: [
                {
                  model: EntertainerProfile,
                  as: 'entertainer',
                  attributes: [
                    'id',
                    'stageName',
                    'entertainerType',
                    'location',
                  ],
                  include: [
                    {
                      model: User,
                      as: 'personalDetails',
                      attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'profileImageURL',
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: CancelEventEntertainer,
          as: 'cancelledEvents',
          required: false,
          where: {
            cancelledBy: 'User',
          },
        },
      ];
      const { result, pagination } = await getAll(User, {
        attributes: [
          'id',
          'firstName',
          'lastName',
          'phoneNumber',
          'profileImageURL',
          'type',
          'isActive',
          'accountStatus',
        ],
        include,
        limit,
        offset,
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
   * Get One User
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

  /**
   * Get One Entertainer
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */

  async getOneEntertainer(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(401)
        .json({ message: 'Invalid URL. Entertainer not found.' });
    }
    try {
      const entertainer = await User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
        include: [
          {
            model: Commission,
            as: 'userCommission',
          },
          {
            model: EntertainerProfile,
            as: 'profile',
            where: { id },
            include: [
              {
                model: Rating,
                as: 'ratings',
                required: false,
                where: {
                  review: {
                    [Op.ne]: null,
                  },
                },
                attributes: [
                  'id',
                  'professionalism',
                  'accommodating',
                  'overallTalent',
                  'recommend',
                  'review',
                  'createdAt',
                ],
                include: [
                  {
                    model: User,
                    as: 'rater',
                    attributes: ['firstName', 'profileImageURL'],
                  },
                  {
                    model: EventEntertainer,
                    as: 'ratedEvent',
                    attributes: ['id'],
                    include: [
                      {
                        model: Event,
                        as: 'event',
                        attributes: ['eventType'],
                      },
                    ],
                  },
                ],
              },
              {
                model: EventEntertainer,
                as: 'hired',
                attributes: ['placeOfEvent'],
              },
            ],
          },
          {
            model: CancelEventEntertainer,
            as: 'cancelledEvents',
            required: false,
            where: {
              cancelledBy: 'Entertainer',
            },
          },
          {
            model: Gallery,
            as: 'galleries',
            attributes: ['id', 'imageURL', 'imageID', 'approved'],
            required: false,
            where: { approved: true },
          },
          {
            model: Video,
            as: 'videos',
            attributes: ['id', 'title', 'youtubeID', 'approved'],
            required: false,
            where: { approved: true },
          },
          {
            model: BankDetail,
            as: 'bankDetail',
          },
          {
            model: Contact,
            as: 'contacts',
          },
          {
            model: ApprovalComment,
            as: 'approvalComment',
            attributes: [
              'entertainerProfile',
              'bankAccount',
              'contact',
              'identification',
              'youTube',
            ],
          },
          {
            model: Identification,
            as: 'identification',
          },
          {
            required: false,
            model: BadgeUser,
            as: 'badges',
            include: [
              {
                model: Badge,
                as: 'badge',
              },
            ],
          },
        ],
      });

      const avgRatings = await Rating.findAll({
        where: { entertainerId: entertainer.profile.id },
        attributes: [
          [
            Sequelize.fn('AVG', Sequelize.col('professionalism')),
            'professionalism',
          ],
          [
            Sequelize.fn('AVG', Sequelize.col('accommodating')),
            'accommodating',
          ],
          [
            Sequelize.fn('AVG', Sequelize.col('overallTalent')),
            'overallTalent',
          ],
          [Sequelize.fn('AVG', Sequelize.col('recommend')), 'recommend'],
        ],
      });

      return res.status(200).json({
        message: 'Entertainer detail',
        entertainer: { ...entertainer.toJSON(), avgRatings },
      });
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  /**
   * event one details
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneEvent(req, res) {
    const eventId = req.params.id;
    if (!eventId) {
      return res.status(400).json({ message: 'Kindly provide an event id' });
    }
    Event.findOne({
      where: { id: eventId },
      include: [
        {
          model: EventEntertainer,
          as: 'entertainers',
          include: [
            {
              model: EntertainerProfile,
              as: 'entertainer',
              attributes: [
                'id',
                'stageName',
                'entertainerType',
                'location',
                'slug',
              ],
              include: [
                {
                  model: User,
                  as: 'personalDetails',
                  attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'profileImageURL',
                  ],
                },
              ],
            },
            {
              model: Application,
              as: 'applications',
              attributes: ['id', 'status'],
            },
          ],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
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
        return res.status(500).json({ message: error.message });
      });
  },

  /**
   * get Dashboard Auctions, Requests, upcoming Events, pending payments (for entertainers)
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async getDashboardDetailsForAdmin(req, res) {
    const auctions = await EventEntertainer.findAll({
      where: {
        hireType: EVENT_HIRETYPE.AUCTION,
        auctionStartDate: { [Op.lte]: Sequelize.literal('NOW()') },
        auctionEndDate: { [Op.gte]: Sequelize.literal('NOW()') },
        hiredEntertainer: null,
        cancelled: false,
      },
      include: [
        {
          model: Event,
          as: 'event',
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        },
        {
          model: Application,
          as: 'applications',
          required: false,
        },
      ],
    });
    EventEntertainer.findAll({
      where: {
        [Op.or]: [
          {
            // Upcoming Events
            [Op.and]: Sequelize.literal(
              '"eventEntertainer"."hiredEntertainer" is NOT null'
            ),
            [Op.and]: Sequelize.literal('"event"."eventDate" > NOW()'),
          },
          {
            // Requests
            [Op.and]: [
              {
                [Op.and]: Sequelize.literal(
                  `"applications"."userId" is NOT NULL`
                ),
              },
              {
                [Op.and]: Sequelize.literal(
                  `"applications"."status" = '${REQUEST_ACTION.PENDING}'`
                ),
              },
              {
                [Op.and]: Sequelize.literal(
                  `"applications"."applicationType" = 'Request'`
                ),
              },
              {
                [Op.and]: Sequelize.literal(
                  `"applications"."expiryDate" > NOW()`
                ),
              },
            ],
          },
          {
            // Bids
            [Op.and]: [
              {
                [Op.and]: Sequelize.literal(
                  `"applications"."userId" is NOT null`
                ),
              },
              {
                [Op.and]: Sequelize.literal(
                  `"applications"."status" = '${REQUEST_ACTION.PENDING}'`
                ),
              },
              {
                [Op.and]: Sequelize.literal(
                  `"applications"."applicationType" = 'Bid'`
                ),
              },
            ],
          },
        ],
      },
      // attributes: ['id'],
      include: [
        {
          model: Event,
          as: 'event',
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
          where: {
            eventDate: { [Op.gte]: addDays(Date.now(), 3) },
          },
        },
        {
          model: Application,
          as: 'applications',
        },
      ],
    }).then(async (eventEntertainers) => {
      const eventsGroup = await EventEntertainer.findAll({
        group: ['hireType'],
        attributes: [
          'hireType',
          [Sequelize.fn('COUNT', Sequelize.col('hireType')), 'total'],
        ],
      });

      const eventsOverview = eventsGroup.reduce(
        (acc, value) => ({
          ...acc,
          [value.dataValues.hireType]: value.dataValues.total,
        }),
        {}
      );

      const usersGroup = await User.findAll({
        group: ['type'],
        attributes: [
          'type',
          [Sequelize.fn('COUNT', Sequelize.col('type')), 'total'],
        ],
      });

      const usersOverview = usersGroup.reduce(
        (acc, value) => ({
          ...acc,
          [value.dataValues.type]: value.dataValues.total,
        }),
        {}
      );

      const userPayments = await Application.count({
        where: {
          paid: true,
        },
      });
      const paidEntertainers = await Payment.count();

      const pendingPayments = await EventEntertainer.findAll({
        where: {
          cancelled: false,
          [Op.and]: Sequelize.literal('"eventPayment"."id" is null'),
          hiredEntertainer: {
            [Op.ne]: null,
          },
        },
        include: [
          {
            model: Event,
            as: 'event',
            attributes: ['id', 'eventType', 'eventDate'],
            where: {
              eventDate: {
                [Op.lt]: Date.now(),
              },
            },
          },
          {
            model: Payment,
            as: 'eventPayment',
          },
          {
            model: Application,
            as: 'applications',
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
                model: Commission,
                as: 'commission',
              },
            ],
          },
        ],
      });

      const results = eventEntertainers.reduce(
        (result, eventEntertainer) => {
          if (
            eventEntertainer.applications &&
            eventEntertainer.applications.length > 0 &&
            eventEntertainer.applications[0].applicationType === 'Bid'
          ) {
            result.bids.push(eventEntertainer);
          } else if (eventEntertainer.hiredEntertainer) {
            result.upcomingEvents.push({
              ...eventEntertainer.event.toJSON(),
              eventEntertainerId: eventEntertainer.id,
            });
          } else {
            result.requests.push(eventEntertainer);
          }
          return result;
        },
        { bids: [], requests: [], upcomingEvents: [] }
      );

      const unresolvedEvents = await CancelEventEntertainer.count({
        where: {
          resolved: false,
        },
      });

      return res.status(200).json({
        results: {
          ...results,
          auctions,
          pendingPayments,
          eventsOverview,
          usersOverview,
          paymentsOverview: {
            userPayments,
            paidEntertainers,
            pendingPayments: pendingPayments.length,
          },
          unresolvedEvents,
        },
      });
    });
  },

  /**
   * get Pending payments
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async getPendingPayments(req, res) {
    const pendingPayments = await EventEntertainer.findAll({
      where: {
        cancelled: false,
        [Op.and]: Sequelize.literal('"eventPayment"."id" is null'),
        hiredEntertainer: {
          [Op.ne]: null,
        },
      },
      include: [
        {
          model: Event,
          as: 'event',
          attributes: ['id', 'eventType', 'eventDate'],
          where: {
            eventDate: {
              [Op.lt]: Date.now(),
            },
          },
        },
        {
          model: Payment,
          as: 'eventPayment',
        },
        {
          model: Application,
          as: 'applications',
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
              model: Commission,
              as: 'commission',
            },
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
    });

    return res.json({ pendingPayments });
  },

  getOneApplication(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        message: 'Application Id needed to view application',
      });
    }

    Application.findOne({
      where: {
        id,
      },
      include: [
        {
          model: EventEntertainer,
          as: 'eventEntertainerInfo',
          include: {
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
                  'profileImageURL',
                  'email',
                  'phoneNumber',
                ],
              },
            ],
          },
        },
        {
          model: Commission,
          as: 'commission',
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'profileImageURL'],
          include: [
            {
              model: EntertainerProfile,
              as: 'profile',
            },
            {
              model: BankDetail,
              as: 'bankDetail',
            },
          ],
        },
      ],
    })
      .then((application) => {
        if (!application) {
          return res.status(404).json({ message: 'Application not found' });
        }
        return res.json({ application });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },
};

export default AdminController;
