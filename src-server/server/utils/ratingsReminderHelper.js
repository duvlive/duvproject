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
import EMAIL_CONTENT from '../email-template/content';

const getUnratedEntainers = async () => {
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
            attributes: [
              'description',
              'eventDate',
              'eventDuration',
              'eventType',
              'id',
              'startTime',
            ],
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

export const getUnRatedAndMailUsers = async () => {
  try {
    const result = await getUnratedEntainers();
    return await result.map(async (rating) => {
      const { user, entertainer, event, id } = rating.ratedEvent;
      await sendMail(EMAIL_CONTENT.RATE_ENTERTAINER, user, {
        link: `${process.env.HOST}/user/review-entertainer/${id}`,
        subject: `Your DUVLIVE ${event.eventType} Event - Please rate ${entertainer.entertainerType} ${entertainer.stageName} that you hired!`,
      });
    });
  } catch (error) {
    const errorMessage = error.message || error;
    return { message: errorMessage };
  }
};
