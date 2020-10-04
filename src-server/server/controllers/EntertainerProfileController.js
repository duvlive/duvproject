import Sequelize, { Op } from 'sequelize';
import { updateUser } from '../utils';
import {
  User,
  Badge,
  BadgeUser,
  Rating,
  Event,
  EntertainerProfile,
  Gallery,
  Video,
  EventEntertainer,
  Application,
  BankDetail,
  Contact,
  Identification,
  ApprovalComment,
  CancelEventEntertainer,
} from '../models';
import { ENTERTAINER_APPROVAL, USER_TYPES } from '../constant';
import { getAll } from '../utils/modelHelper';

export const userAssociatedModels = [
  {
    model: EntertainerProfile,
    as: 'profile',
  },
];

export const entertainerProfileAssociatedModels = [
  {
    model: User,
    as: 'personalDetails',
  },
];

export const slugify = async (stageName, id = 0) => {
  const slug = stageName
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  const slugIsFound = await EntertainerProfile.findOne({ where: { slug } });
  return slugIsFound ? `${slug}${id}` : slug;
};

const formatSearchEntertainers = (result) =>
  result.reduce((acc, user) => {
    const entertainer = {
      id: user.id,
      about: user.profile.about,
      approved: user.profile.approved,
      availableFor: user.profile.availableFor,
      baseCharges: user.profile.baseCharges,
      entertainerId: user.profile.id,
      entertainerType: user.profile.entertainerType,
      location: user.profile.location,
      preferredCharges: user.profile.preferredCharges,
      profileImageURL: user.profileImageURL,
      ratings: user.profile.ratings,
      slug: user.profile.slug,
      stageName: user.profile.stageName,
      willingToTravel: user.profile.willingToTravel,
      yearStarted: user.profile.yearStarted,
    };
    return [...acc, entertainer];
  }, []);

const formatAllEntertainers = (result) =>
  result.reduce((acc, user) => {
    const entertainer = {
      id: user.id,
      about: user.profile.about,
      approved: user.profile.approved,
      availableFor: user.profile.availableFor,
      baseCharges: user.profile.baseCharges,
      entertainerId: user.profile.id,
      entertainerType: user.profile.entertainerType,
      location: user.profile.location,
      preferredCharges: user.profile.preferredCharges,
      profileImageURL: user.profileImageURL,
      ratings: user.profile.ratings,
      slug: user.profile.slug,
      stageName: user.profile.stageName,
      willingToTravel: user.profile.willingToTravel,
      yearStarted: user.profile.yearStarted,
      // bankDetail: user.bankDetail,
      // contacts: user.contacts,
      approvalComment: user.approvalComment,
      // identification: !!user.identification,
      // youtubeChannel: !!user.profile.youTubeChannel,
      profileInfo: [
        !!user.profileImageURL && !!user.profile.stageName,
        !!user.bankDetail && !!user.bankDetail.accountNumber,
        !!user.contacts && !!user.contacts[0] && !!user.contacts[0].firstName,
        !!user.profile && !!user.profile.youTubeChannel,
        !!user.identification && !!user.identification.idType,
      ].filter((e) => e).length,
    };
    return [...acc, entertainer];
  }, []);

const EntertainerProfileController = {
  /**
   * update User And Entertainer Profile
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async updateUserAndEntertainerProfile(req, res) {
    const {
      about,
      city,
      baseCharges,
      preferredCharges,
      availableFor,
      location,
      stageName,
      yearStarted,
      willingToTravel,
      eventType,
      entertainerType,
      youTubeChannel,
    } = req.body;

    const currentSlug =
      req.user && req.user.profile ? req.user.profile.slug : null;

    let slug = currentSlug;

    if (!currentSlug && stageName) {
      slug = await slugify(stageName, req.user.id);
    }

    const entertainerProfileData = {
      about,
      city,
      baseCharges,
      preferredCharges,
      availableFor,
      location,
      stageName,
      yearStarted,
      willingToTravel,
      eventType,
      entertainerType,
      youTubeChannel,
      slug,
    };

    updateUser(req.user, entertainerProfileData, 'Profile')
      .then((entertainerProfile) => {
        return res.status(200).json({
          message: 'User profile update is succesful',
          entertainerProfile,
        });
      })
      .catch((error) => {
        return res.status(error.status || 400).json({ message: error.message });
      });
  },

  transformEntertainers(entertainer, updatedValues = {}) {
    const transformEntertainer = {
      id: entertainer.id,
      firstName: entertainer.firstName,
      lastName: entertainer.lastName,
      type: entertainer.type,
      profileImg: entertainer.profileImageURL,
      stageName: entertainer.profile.stageName,
      entertainerType: entertainer.profile.entertainerType,
      slug: entertainer.profile.slug,
    };

    return { ...transformEntertainer, ...updatedValues };
  },

  getEntertainers(req, res) {
    User.findAll({
      where: {
        type: USER_TYPES.ENTERTAINER,
        [Op.and]: Sequelize.literal('"profile"."approved" is TRUE'),
      },
      include: userAssociatedModels,
      order: [[{ model: EntertainerProfile, as: 'profile' }, 'id', 'DESC']],
    })
      .then((entertainers) => {
        return res.status(200).json({
          message: 'Entertainers List',
          entertainers: entertainers.map((entertainer) =>
            EntertainerProfileController.transformEntertainers(entertainer)
          ),
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * Get All Approved Entertainers List
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */

  async getApprovedEntertainersList(req, res) {
    const id = req.query.id || 'userId';
    User.findAll({
      where: {
        type: USER_TYPES.ENTERTAINER,
        [Op.and]: Sequelize.literal('"profile"."approved" is TRUE'),
      },
      include: userAssociatedModels,
      order: [
        [{ model: EntertainerProfile, as: 'profile' }, 'stageName', 'ASC'],
      ],
    })
      .then((entertainers) => {
        return res.status(200).json({
          message: 'Entertainers List',
          entertainers: entertainers.map((entertainer) => ({
            value: id === 'userId' ? entertainer.id : entertainer.profile.id,
            label: entertainer.profile.stageName,
          })),
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  transformEntertainer(entertainer, updatedValues = {}) {
    const transformEntertainer = {
      id: entertainer.personalDetails.id,
      about: entertainer.about,
      entertainerType: entertainer.entertainerType,
      firstName: entertainer.personalDetails.firstName,
      lastName: entertainer.personalDetails.lastName,
      profileImg: entertainer.personalDetails.profileImageURL,
      slug: entertainer.slug,
      stageName: entertainer.stageName,
      type: entertainer.personalDetails.type,
    };

    return { ...transformEntertainer, ...updatedValues };
  },

  getEntertainerBySlug(req, res) {
    const { slug } = req.params;
    if (!slug) {
      return res
        .status(401)
        .json({ message: 'Invalid URL. Entertainer not found.' });
    }
    User.findOne({
      attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
      include: [
        {
          model: EntertainerProfile,
          as: 'profile',
          where: {
            slug: {
              [Op.iLike]: slug.toLowerCase(),
            },
          },
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
        {
          model: CancelEventEntertainer,
          as: 'cancelledEvents',
          required: false,
          where: {
            cancelledBy: 'Entertainer',
          },
        },
      ],
    })
      .then((entertainer) => {
        const entertainerType =
          entertainer && entertainer.profile
            ? entertainer.profile.entertainerType
            : ['MC', 'DJ', 'Liveband'];

        User.findAll({
          order: [Sequelize.fn('RANDOM')],
          limit: 3,
          include: [
            {
              where: {
                [Op.and]: [
                  { entertainerType, approved: true },
                  {
                    slug: { [Op.ne]: slug },
                  },
                ],
              },
              model: EntertainerProfile,
              as: 'profile',
            },
          ],
        }).then(async (randomEntertainers) => {
          const otherEntertainers = randomEntertainers.map((entertainer) =>
            EntertainerProfileController.transformEntertainers(entertainer)
          );
          if (!entertainer) {
            return res
              .status(401)
              .json({ message: 'Entertainer not found.', otherEntertainers });
          }
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
            otherEntertainers,
          });
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  async searchForEntertainer(req, res) {
    const name = req.query.name;
    if (name) {
      if (name.length < 2) {
        return res
          .status(412)
          .send({ msg: 'Your search term must exceed 2 characters' });
      }
    }

    // const userQuery = {
    //   [Op.or]: [
    //     { firstName: { [Op.iLike]: `%${name}%` } },
    //     { lastName: { [Op.iLike]: `%${name}%` } },
    //   ],
    // };

    const entertainerQuery = {
      [Op.or]: [
        { stageName: { [Op.iLike]: `%${name.toLowerCase()}%` } },
        { slug: { [Op.iLike]: `%${name.toLowerCase()}%` } },
      ],
    };

    const include = [
      {
        model: EntertainerProfile,
        as: 'profile',
        where: entertainerQuery,
        include: [
          {
            model: Rating,
            as: 'ratings',
            attributes: [
              'id',
              'professionalism',
              'accommodating',
              'overallTalent',
              'recommend',
              'review',
              'createdAt',
            ],
          },
        ],
      },
    ];

    try {
      const { result, pagination } = await getAll(User, {
        // where: userQuery,
        include,
        limit: 50,
      });
      return res
        .status(200)
        .json({ entertainers: formatSearchEntertainers(result), pagination });
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  async getRandomRecommendation(req, res) {
    const include = [
      {
        model: EntertainerProfile,
        as: 'profile',
      },
    ];

    try {
      const { result, pagination } = await getAll(User, {
        include,
        limit: 2,
        where: { type: { [Op.eq]: 2 } },
        order: [Sequelize.fn('RANDOM')],
      });
      return res
        .status(200)
        .json({ entertainers: formatSearchEntertainers(result), pagination });
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  /**
   * search for entertainer from event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async searchForEntertainersFromEvents(req, res) {
    const eventEntertainerId = req.params.eventEntertainerId;
    try {
      const eventEntertainer = await EventEntertainer.findOne({
        where: { id: eventEntertainerId },
      });
      EventEntertainer.findAll({
        where: {
          userId: req.user.id,
          entertainerType: eventEntertainer.entertainerType,
        },
        include: [
          {
            model: Application,
            as: 'applications',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
                include: [
                  {
                    model: EntertainerProfile,
                    as: 'profile',
                  },
                ],
              },
            ],
          },
        ],
      }).then((events) => {
        if (!events || events.length === 0) {
          return res
            .status(404)
            .json({ message: 'No previous entertainer found' });
        }
        const entertainers = events.reduce((acc, event) => {
          const entertainer = event.applications.map(({ user }) => ({
            profileImageURL: user.profileImageURL,
            stageName: user.profile.stageName,
            about: user.profile.about,
            location: user.profile.location,
            yearStarted: user.profile.yearStarted,
            willingToTravel: user.profile.willingToTravel,
            baseCharges: user.profile.baseCharges,
            preferredCharges: user.profile.preferredCharges,
            slug: user.profile.slug,
            availableFor: user.profile.availableFor,
          }));
          return [...acc, ...entertainer];
        }, []);
        return res.status(200).json({ entertainers });
      });
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  /**
   * recommend entertainer from event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async recommendEntertainer(req, res) {
    const {
      entertainerType,
      lowestBudget,
      highestBudget,
      language,
      location,
    } = req.query;
    if (!entertainerType) {
      return res.status(412).send({
        msg:
          'Entertainer type must be selected before a recommendation is made',
      });
    }

    try {
      const entertainerQuery = {
        entertainerType: { [Op.eq]: entertainerType },
      };

      if (lowestBudget && parseInt(lowestBudget, 10) > 0) {
        entertainerQuery.baseCharges = { [Op.gte]: lowestBudget };
      }

      if (highestBudget && parseInt(highestBudget, 10) > 0) {
        entertainerQuery.preferredCharges = { [Op.lte]: highestBudget };
      }

      if (language) {
        const languages = JSON.parse(language);

        let languageQuery = [];
        for (const lang of languages) {
          languageQuery.push({
            [Op.substring]: lang,
          });
        }
        entertainerQuery.preferredLanguage = {
          [Op.and]: languageQuery,
        };
      }

      if (location && location !== 'Any') {
        entertainerQuery.location = { [Op.eq]: location };
      }

      const include = [
        {
          model: EntertainerProfile,
          as: 'profile',
          where: entertainerQuery,
          include: [
            {
              model: Rating,
              as: 'ratings',
              attributes: [
                'id',
                'professionalism',
                'accommodating',
                'overallTalent',
                'recommend',
                'review',
                'createdAt',
              ],
            },
          ],
        },
      ];

      try {
        const { result, pagination } = await getAll(User, {
          include,
          limit: 6,
        });
        return res
          .status(200)
          .json({ entertainers: formatSearchEntertainers(result), pagination });
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

  getTotalEntertainers(req, res) {
    EntertainerProfile.findAll({
      where: {
        approved: ENTERTAINER_APPROVAL['APPROVED'],
      },
    })
      .then((entertainers) => {
        return res.status(200).json({
          message: 'Total Entertainers',
          entertainers: entertainers.reduce(
            (acc, entertainer) => {
              if (entertainer.entertainerType === 'MC') {
                acc['mc'] += 1;
              }
              if (entertainer.entertainerType === 'DJ') {
                acc['dj'] += 1;
              }
              if (entertainer.entertainerType === 'Liveband') {
                acc['liveband'] += 1;
              }
              return acc;
            },
            { mc: 0, dj: 0, liveband: 0 }
          ),
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get-all-entertainers
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async getAllEntertainers(req, res) {
    let entertainerQuery = {};
    const {
      entertainerType,
      lowestBudget,
      highestBudget,
      language,
      location,
      approved,
      limit,
      offset,
    } = req.query;

    try {
      if (entertainerType) {
        entertainerQuery.entertainerType = entertainerType;
      }

      if (lowestBudget && parseInt(lowestBudget, 10) > 0) {
        entertainerQuery.baseCharges = { [Op.gte]: lowestBudget };
      }

      if (highestBudget && parseInt(highestBudget, 10) > 0) {
        entertainerQuery.preferredCharges = { [Op.lte]: highestBudget };
      }

      if (language) {
        const languages = JSON.parse(language);

        let languageQuery = [];
        for (const lang of languages) {
          languageQuery.push({
            [Op.substring]: lang,
          });
        }
        entertainerQuery.preferredLanguage = {
          [Op.and]: languageQuery,
        };
      }

      if (location && location !== 'Any') {
        entertainerQuery.location = { [Op.eq]: location };
      }

      if (approved) {
        entertainerQuery.approved = {
          [Op.eq]: approved === 'YES' ? true : false,
        };
      }

      const include = [
        {
          model: EntertainerProfile,
          as: 'profile',
          where: entertainerQuery,
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
      ];

      try {
        const { result, pagination } = await getAll(User, {
          include,
          offset: offset || 0,
          limit: limit || 10,
        });
        return res
          .status(200)
          .json({ entertainers: formatAllEntertainers(result), pagination });
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

export default EntertainerProfileController;
