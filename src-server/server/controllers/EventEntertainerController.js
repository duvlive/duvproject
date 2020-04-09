import { Op } from 'sequelize';
import {
  Application,
  EntertainerProfile,
  EventEntertainer,
  Event,
  User,
} from '../models';
import { validString } from '../utils';
import EMAIL_CONTENT from '../email-template/content';

import sendMail from '../MailSender';

const sendRequestMail = ({ askingPrice, email, stageName, event }) => {
  // Build Email
  const contentTop = `Congratulations!!! Your have a new event request  NGN ${askingPrice}. Please find event details below`;
  const contentBottom = `
    <strong>Event:</strong> ${event.eventType} <br>
    <strong>Place:</strong> ${event.eventPlace} <br>
    <strong>Date:</strong> ${event.eventDate} <br>
    <strong>Start Time:</strong> ${event.eventStart} <br>
    <strong>Duration:</strong> ${event.eventDuration} <br>
    <strong>Street Line 1:</strong> ${event.eventStreetLine1} <br>
    <strong>Street Line 2:</strong> ${event.eventStreetLine2} <br>
    <strong>State:</strong> ${event.eventState} <br>
    <strong>LGA:</strong> ${event.eventLga} <br>
    <strong>City:</strong> ${event.eventCity} <br>
  `;

  sendMail(
    EMAIL_CONTENT.ENTERTAINER_REQUEST,
    { email: email },
    {
      firstName: stageName,
      title: `You have a request of NGN ${askingPrice}`,
      link: '#',
      contentTop,
      contentBottom,
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
      lowestBudget,
      highestBudget,
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
      ...validString(language),
      ...validString(expectedAudienceSize),
      ...validString(lowestBudget),
      ...validString(highestBudget),
      ...validString(specialRequest),
    };

    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }

    // ensure valid hire type before saving
    const VALID_HIRE_TYPES = ['Search', 'Auction', 'Recommend'];
    if (!VALID_HIRE_TYPES.includes(hireType)) {
      return res.status(400).json({
        message: `${hireType} is not a valid hire type. Hire type should be one of Search, Auction or Recommend`,
      });
    }

    let entertainerDetails;
    // save new event entertainer details
    if (!id) {
      const hasApplicationRequest =
        hireType === 'Search' || hireType === 'Recommend';

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
          const event = await req.user.getEvents({
            where: { id: eventId },
            include: {
              model: EventEntertainer,
              as: 'entertainers',
            },
          });

          if (hasApplicationRequest) {
            const savedApplication = await Application.create({
              userId: entertainerId,
              askingPrice,
              eventId,
              eventEntertainerId: eventEntertainer.id,
              applicationType: 'Request',
              expiryDate: Date.now(),
            });

            if (savedApplication) {
              // send mail to entertainer
              sendRequestMail({
                askingPrice,
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
