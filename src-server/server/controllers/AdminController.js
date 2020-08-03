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
} from '../models';
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
};

export default AdminController;
