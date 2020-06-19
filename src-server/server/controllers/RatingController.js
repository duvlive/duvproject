import Sequelize from 'sequelize';
import {
  EntertainerProfile,
  EventEntertainer,
  Rating,
  Review,
  User,
} from '../models';
import { getAll, validString } from '../utils';

const RatingController = {
  /**
   * @desc create and update Rating
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserRating(req, res) {
    const {
      entertainerId,
      eventEntertainerId,
      professionalism,
      accommodating,
      overallTalent,
      recommend,
      review = '',
      id,
    } = req.body;

    const error = {
      ...validString(professionalism),
      ...validString(accommodating),
      ...validString(accommodating),
      ...validString(overallTalent),
      ...validString(recommend),
    };

    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newRating = {};
    if (!id) {
      return Rating.create({
        entertainerId,
        eventEntertainerId,
        professionalism,
        accommodating,
        overallTalent,
        recommend,
        review,
        userId: req.user.id,
      })
        .then((rating) => {
          newRating = rating;
          return req.user.addRating(rating);
        })
        .then(() => {
          return res.status(200).json({
            message: 'Rating created successfully',
            rating: newRating,
          });
        })
        .catch((error) => {
          const status = error.status || 500;
          const errorMessage =
            (error.parent && error.parent.detail) || error.message || error;
          return res.status(status).json({ message: errorMessage });
        });
    }
    return req.user
      .getRatings({ where: { id } })
      .then((ratings) => {
        if (ratings && ratings.length > 0) {
          return ratings[0].update({
            entertainerId,
            professionalism,
            accommodating,
            overallTalent,
            review,
            recommend,
          });
        }
        throw `No rating with id ${id}`;
      })
      .then((rating) => {
        return res.status(200).json({
          message: 'Rating updated successfully',
          rating,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * @desc get User Rating
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserRatings(req, res) {
    req.user
      .getRatings({
        include: [
          {
            model: User,
            as: 'rater',
            attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
          },
          {
            model: EntertainerProfile,
            as: 'rated',
            attributes: ['id', 'slug'],
            include: [
              {
                model: User,
                as: 'personalDetails',
                attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
              },
            ],
          },
          {
            model: EventEntertainer,
            as: 'ratedEvent',
          },
        ],
      })
      .then((ratings) => {
        if (!ratings || ratings.length === 0) {
          return res.status(404).json({ message: 'Rating not found' });
        }
        return res.status(200).json({ ratings });
      });
  },

  /**
   * @desc get one Rating details
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneRating(req, res) {
    const ratingId = req.params.id;
    if (!ratingId) {
      return res.status(400).json({ message: 'Kindly provide a rating id' });
    }
    Rating.findOne({
      where: { id: ratingId },
      include: [
        {
          model: User,
          as: 'rater',
          attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
        },
        {
          model: EntertainerProfile,
          as: 'rated',
          attributes: ['id', 'slug'],
          include: [
            {
              model: User,
              as: 'personalDetails',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        },
        {
          model: EventEntertainer,
          as: 'ratedEvent',
        },
      ],
    })
      .then((rating) => {
        if (!rating) {
          return res.status(404).json({ message: 'Rating not found' });
        }

        return res.json({ rating });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  },

  /**
   * @desc get average User Rating
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getAverageEntertainerRatings(req, res) {
    const entertainerId = req.user.profile.id;
    Rating.findAll({
      where: {
        entertainerId,
      },
      attributes: [
        [
          Sequelize.fn('AVG', Sequelize.col('professionalism')),
          'avgProfessionalism',
        ],
        [
          Sequelize.fn('AVG', Sequelize.col('accommodating')),
          'avgAccommodating',
        ],
        [
          Sequelize.fn('AVG', Sequelize.col('overallTalent')),
          'avgOverallTalent',
        ],
        [Sequelize.fn('AVG', Sequelize.col('recommend')), 'avgRecommend'],
      ],
    })
      .then((avgRatings) => {
        if (!avgRatings || avgRatings.length === 0) {
          return res.status(404).json({ message: 'Average Rating not found' });
        }
        return res.status(200).json({ avgRatings });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * @desc get Entertainer Ratings
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerRatings(req, res) {
    const entertainerId = req.user.profile.id;
    Rating.findAll({
      where: {
        entertainerId,
      },
      include: [
        {
          model: Review,
          as: 'reviews',
        },
        {
          model: EventEntertainer,
          as: 'ratedEvent',
        },
        {
          model: User,
          as: 'rater',
          attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
        },
      ],
    })
      .then((ratings) => {
        if (!ratings || ratings.length === 0) {
          return res.status(404).json({ message: 'Ratings not found' });
        }
        return res.status(200).json({ ratings });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * @desc get One Entertainer Rating
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneEntertainerRating(req, res) {
    const entertainerId = req.user.profile.id;
    const id = req.params.id;
    Rating.findOne({
      where: {
        id,
        entertainerId,
      },
      include: [
        {
          model: Review,
          as: 'reviews',
        },
        {
          model: EventEntertainer,
          as: 'ratedEvent',
        },
        {
          model: User,
          as: 'rater',
          attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
        },
      ],
    })
      .then((ratings) => {
        if (!ratings) {
          return res.status(404).json({ message: 'Rating not found' });
        }
        return res.status(200).json({ ratings });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * @desc get ratings
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getRatings(req, res) {
    const { userId, entertainerId, eventEntertainerId } = req.params;
    const { offset, limit } = req.query;
    try {
      let ratingQuery = {};
      if (userId) {
        ratingQuery.userId = userId;
      }
      if (entertainerId) {
        ratingQuery.entertainerId = entertainerId;
      }
      if (eventEntertainerId) {
        ratingQuery.eventEntertainerId = eventEntertainerId;
      }
      const options = {
        offset: offset || 0,
        limit: limit || 10,
        where: ratingQuery,
      };
      try {
        const { result, pagination } = await getAll(Rating, options);
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

export default RatingController;
