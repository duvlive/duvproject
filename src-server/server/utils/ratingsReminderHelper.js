import Sequelize, { Op } from 'sequelize';
import { EventEntertainer, Rating, Reminder } from '../models';
import { getAll } from './index';
import { reviewsInclude } from '../controllers/EventController';

const getUnratedEvents = async () => {
  try {
    const options = {
      where: {
        hiredEntertainer: {
          [Op.ne]: null,
        },
        [Op.and]: Sequelize.literal(`"eventRating"."id" is null`),
      },
      attributes: [
        'id',
        'userId',
        'eventId',
        'hiredEntertainer',
        'entertainerType',
      ],
      include: reviewsInclude,
    };

    try {
      const { result } = await getAll(EventEntertainer, options);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  } catch (error) {
    const errorMessage = error.message || error;
    return { message: errorMessage };
  }
};

export const createRatingandReview = async () => {
  console.log('started');
  let result;
  try {
    result = await getUnratedEvents();
    // console.log(result.EventEntertainer.dataValues, '=========');
    return result.forEach((event) => {
      const { eventId, hiredEntertainer, id, userId } = event.dataValues;
      console.log(eventId, hiredEntertainer, id, userId, '*****');
      const eventEntertainerId = id;

      return Rating.create({
        entertainerId: hiredEntertainer,
        eventEntertainerId,
        userId,
      })
        .then((rating) => {
          console.log('Ratings created!!!!');
          const { id } = rating;

          return Reminder.create({
            entertainerId: hiredEntertainer,
            eventId,
            eventEntertainerId,
            userId,
            ratingId: id,
          });
        })
        .then((reminder) => {
          console.log('rating and reminder created', rating, reminder);
        })
        .catch((error) => {
          console.log(error, '.........');
          const status = error.status || 500;
          const errorMessage =
            (error.parent && error.parent.detail) || error.message || error;
          return { message: errorMessage };
        });
    });
  } catch (error) {
    const errorMessage = error.message || error;
    return { message: errorMessage };
  }
};
