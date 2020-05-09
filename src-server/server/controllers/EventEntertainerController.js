import { Op } from 'sequelize';
import {
  Application,
  EntertainerProfile,
  EventEntertainer,
  Commission,
  Event,
  User,
  Rating,
} from '../models';
import { validString, getLongDate, getTime, moneyFormat } from '../utils';
import EMAIL_CONTENT from '../email-template/content';
import { DEFAULT_COMMISSION } from './CommissionController';
import { priceCalculatorHelper } from '../utils/priceCalculator';

import sendMail from '../MailSender';
import { addDays } from 'date-fns';

const sendRequestMail = ({
  askingPrice,
  takeHome,
  email,
  stageName,
  event,
  id,
}) => {
  // Build Email
  const title = `YIPEE!!! You Have A Request To Perform At ${event.eventType}`;

  const contentTop =
    'We are pleased to inform you are requested to perform at an event with the details stated below by an event host.';
  const contentBottom = `
    <strong>Event:</strong> ${event.eventType} <br>
    <strong>Place:</strong> ${event.eventPlace} <br>
    <strong>Date:</strong> ${getLongDate(event.eventDate)} <br>
    <strong>Start Time:</strong> ${getTime(event.startTime)} <br>
    <strong>Duration:</strong> ${event.eventDuration} <br>
    <strong>Offer Amount:</strong> NGN ${moneyFormat(askingPrice)} <br>
    <strong>Take Home Pay:</strong> ${moneyFormat(takeHome)} <br>
  `;

  const contentFooter = `
  <small>
  Note:  By accepting, you undertake to: <br />
  <ol type="a">
   <li>Perform at the above event after which your bank account will be credited with the above stated take-home amount.</li>
   <li>Inform the event host and DUV LIVE of any cancellation at least 48hrs before the event date. Failure to do so (except due to reasons considered under Force Majeure) shall result in the removal of the entertainer's account, the blacklisting of the User's Personal Details on the DUV LIVE online platform, and any other legal action deemed reasonably necessary by the affected persons.</li>
   </ol>
   </small>
   `;

  sendMail(
    EMAIL_CONTENT.ENTERTAINER_REQUEST,
    { email: email, firstName: stageName },
    {
      title,
      subject: title,
      link: `${process.env.HOST}/entertainer/request/view/${id}`,
      button: 'Respond',
      contentTop,
      contentBottom,
      contentFooter,
    }
  );
};

const EventEntertainerController = {
  /**
   * create Event Entertainer
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async updateEventEntertainer(req, res) {
    const {
      entertainerType,
      placeOfEvent,
      genre,
      hireType,
      language,
      expectedAudienceSize,
      ageGroup,
      lowestBudget = '0',
      highestBudget = '0',
      specialRequest,
      eventId,
      id,
      auctionStartDate,
      auctionEndDate,
      askingPrice,
      entertainerId,
    } = req.body;

    const error = {
      ...validString(entertainerType),
      ...validString(placeOfEvent),
      ...validString(expectedAudienceSize),
      ...validString(lowestBudget),
      ...validString(highestBudget),
    };

    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }

    // ensure valid hire type before saving
    const VALID_HIRE_TYPES = [
      'Search',
      'Recommend',
      'Recommendation',
      'Auction',
    ];
    if (!VALID_HIRE_TYPES.includes(hireType)) {
      return res.status(400).json({
        message: `${hireType} is not a valid hire type. Hire type should be one of Search, Auction or Recommend`,
      });
    }

    let entertainerDetails;
    // save new event entertainer details
    if (!id) {
      const hasApplicationRequest =
        hireType === 'Search' ||
        hireType === 'Recommend' ||
        hireType === 'Recommendation';

      if (hasApplicationRequest) {
        // check if application should be available in the request
        if (!askingPrice && !entertainerId) {
          return res.status(400).json({
            message: `Asking price and Entertainer Id required for ${hireType}`,
          });
        }

        // check if entertainer id is valid -::- who knows
        // use opportunity to get entertainer details at once
        entertainerDetails = await User.findOne({
          attributes: ['email'],
          where: { id: entertainerId },
          include: [
            {
              model: EntertainerProfile,
              as: 'profile',
              attributes: ['id', 'stageName'],
            },
          ],
        });

        if (!entertainerDetails) {
          return res.status(400).json({
            message: 'Entertainer cannot be found',
          });
        }

        // check if entertainer has been registered for the event, prevents double application
        const existingApplication = await Application.findOne({
          where: {
            userId: entertainerId,
            eventId,
            [Op.or]: { status: ['Pending', 'Approved'] },
          },
        });

        if (existingApplication) {
          return res.status(400).json({
            message: `An existing application exists for ${entertainerDetails.profile.stageName}`,
          });
        }
      }

      return EventEntertainer.create({
        entertainerType,
        placeOfEvent,
        genre,
        hireType: hireType === 'Recommend' ? 'Recommendation' : hireType,
        language,
        expectedAudienceSize,
        ageGroup,
        lowestBudget,
        highestBudget,
        specialRequest,
        eventId,
        auctionStartDate,
        auctionEndDate,
        userId: req.user.id,
      })
        .then(async (eventEntertainer) => {
          // get the event details
          const event = await Event.findOne({
            where: { id: eventId, userId: req.user.id },
            include: {
              model: EventEntertainer,
              as: 'entertainers',
            },
          });

          if (hasApplicationRequest) {
            const defaultCommission = await Commission.findOne({
              where: { default: true },
            });

            // calculate commission
            const commission = defaultCommission || DEFAULT_COMMISSION;
            const { entertainerFee } = priceCalculatorHelper(
              askingPrice,
              commission,
              hireType
            );

            // jsdla
            const savedApplication = await Application.create({
              userId: entertainerId,
              askingPrice,
              eventId,
              commission: commission.id,
              eventEntertainerId: eventEntertainer.id,
              applicationType: 'Request',
              takeHome: entertainerFee,
              expiryDate: addDays(Date.now(), 1),
            });

            if (savedApplication) {
              // send mail to entertainer
              sendRequestMail({
                id: savedApplication.id,
                askingPrice,
                takeHome: entertainerFee,
                email: entertainerDetails.email,
                stageName: entertainerDetails.profile.stageName,
                event,
              });
            }
          }

          return res.status(200).json({
            message: 'Event Entertainer created successfully',
            event: event,
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
      .getEvents({
        where: { id: eventId },
        include: {
          model: EventEntertainer,
          as: 'entertainers',
          where: { id },
        },
      })
      .then((event) => {
        if (event && event.length > 0) {
          return event[0].entertainers[0].update({
            entertainerType,
            placeOfEvent,
            genre,
            language,
            expectedAudienceSize,
            ageGroup,
            lowestBudget,
            highestBudget,
            specialRequest,
          });
        }
        throw `No Event with id ${id}`;
      })
      .then((event) => {
        return res.status(200).json({
          message: 'Event Entertainer updated successfully',
          event,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get EventEntertainers
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEventEntertainers(req, res) {
    req.user
      .getEvents({
        include: {
          model: EventEntertainer,
          as: 'entertainers',
        },
      })
      .then((events) => {
        if (!events || events.length === 0) {
          return res
            .status(404)
            .json({ message: 'Event Entertainers not found' });
        }
        return res.status(200).json({ events });
      });
  },

  /**
   * event one details
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneEventEntertainer(req, res) {
    const eventEntertainerId = req.params.id;
    if (!eventEntertainerId) {
      return res
        .status(400)
        .json({ message: 'Kindly provide an event entertainer info id' });
    }
    EventEntertainer.findOne({
      where: { id: eventEntertainerId },
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
          model: EntertainerProfile,
          as: 'entertainer',
          attributes: ['id', 'entertainerType', 'stageName', 'slug'],
          include: [
            {
              model: User,
              as: 'personalDetails',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        },
        {
          model: Rating,
          as: 'eventRating',
        },
      ],
    })
      .then((eventEntertainerInfo) => {
        if (!eventEntertainerInfo) {
          return res
            .status(404)
            .json({ message: 'Event Entertainer Info not found' });
        }

        return res.json({ eventEntertainerInfo });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  },
};

export default EventEntertainerController;
