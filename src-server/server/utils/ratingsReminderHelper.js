import Sequelize, { Op } from 'sequelize';
import {
  Event,
  EventEntertainer,
  EntertainerProfile,
  User,
  Rating,
} from '../models';
import { getAll } from './index';
import sendMail from '../MailSender';

const getUnratedEvents = async () => {
  try {
    const options = {
      where: {
        [Op.or]: [
          {
            professionalism: {
              [Op.eq]: null,
            },
          },
          {
            accommodating: {
              [Op.eq]: null,
            },
          },
          {
            overallTalent: {
              [Op.eq]: null,
            },
          },
          {
            recommend: {
              [Op.eq]: null,
            },
          },
        ],
      },
      include: {
        model: EventEntertainer,
        as: 'ratedEvent',
        required: true,
        include: [
          {
            model: Event,
            as: 'event',
            where: { eventDate: { [Op.lte]: Sequelize.literal('NOW()') } },
            required: true,
            attributes: ['eventDate', 'description', 'eventType', 'id'],
          },
          {
            model: EntertainerProfile,
            as: 'entertainer',
            attributes: ['stageName', 'entertainerType'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['email', 'firstName', 'lastName'],
          },
        ],
      },
      attributes: ['id'],
    };

    try {
      const { result } = await getAll(Rating, options);
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
  try {
    const result = await getUnratedEvents();
    return await result.map(async (rating) => {
      const { id } = rating.dataValues;
      const { user, entertainer, event } = rating.ratedEvent;
      const content = `${process.env.HOST}/user/events/view/${event.id}`;
      await sendMail(content, user, {
        title: 'Whatever',
        link: `${process.env.HOST}/user/events/view/${event.id}`,
        subject: 'Update Rating reminder',
      });
    });
  } catch (error) {
    const errorMessage = error.message || error;
    return { message: errorMessage };
  }
};
