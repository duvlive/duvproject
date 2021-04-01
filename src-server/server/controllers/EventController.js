import Sequelize, { Op } from 'sequelize';
import { Event } from '../models';
import { validString, getLongDate, getTime, getAll } from '../utils';
import {
  EventEntertainer,
  User,
  EntertainerProfile,
  Application,
  Rating,
  Notification,
  CancelEventEntertainer,
} from '../models';
import sendMail from '../MailSender';
import EMAIL_CONTENT from '../email-template/content';
import {
  ENTERTAINER_DISCOUNT,
  EVENTDATE_FILTER,
  EVENT_HIRETYPE,
  NOTIFICATIONS,
  NOTIFICATION_TYPE,
  REQUEST_ACTION,
  USER_TYPES,
} from '../constant';
import { isPast, isValid } from 'date-fns';
import { differenceInHours, parse } from 'date-fns';
import { DEFAULT_COMMISSION } from './CommissionController';
import { sendSMS } from '../SMSSender';

export const reviewsInclude = [
  {
    model: Event,
    as: 'event',
    where: {
      eventDate: {
        [Op.lte]: Sequelize.literal('NOW()'),
      },
    },
    attributes: ['id', 'eventDate', 'eventType', 'eventDuration'],
  },
  {
    model: EntertainerProfile,
    as: 'entertainer',
    attributes: ['id', 'slug', 'stageName', 'entertainerType', 'location'],
    include: [
      {
        model: User,
        as: 'personalDetails',
        attributes: ['id', 'profileImageURL'],
      },
    ],
  },
  {
    model: Rating,
    as: 'eventRating',
  },
];

const EventController = {
  /**
   * create Event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserEvent(req, res) {
    const {
      eventType,
      eventDate,
      startTime,
      eventDuration,
      moreInformation,
      streetLine1,
      streetLine2,
      state,
      lga,
      city,
      landmark,
      description,
      id,
    } = req.body;

    const error = {
      ...validString(eventType),
      ...validString(eventDate),
      ...validString(startTime),
      ...validString(eventDuration),
      ...validString(moreInformation),
      ...validString(streetLine1),
      ...validString(streetLine2),
      ...validString(state),
      ...validString(lga),
      ...validString(city),
      ...validString(landmark),
      ...validString(description),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newEvent = {};
    if (!id) {
      return Event.create({
        eventType,
        eventDate,
        startTime,
        eventDuration,
        moreInformation,
        streetLine1,
        streetLine2,
        state,
        lga,
        city,
        landmark,
        description,
        userId: req.user.id,
      })
        .then((event) => {
          newEvent = event;
          return req.user.addEvent(event);
        })
        .then(() => {
          return res.status(200).json({
            message: 'Event created successfully',
            event: newEvent,
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
      .getEvents({ where: { id } })
      .then((events) => {
        if (events && events.length > 0) {
          return events[0].update({
            eventType,
            eventDate,
            startTime,
            eventDuration,
            moreInformation,
            streetLine1,
            streetLine2,
            state,
            lga,
            city,
            landmark,
            description,
          });
        }
        throw `No Event with id ${id}`;
      })
      .then((event) => {
        return res.status(200).json({
          message: 'Event updated successfully',
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
            {
              model: Application,
              as: 'applications',
              attributes: ['id', 'status'],
            },
            {
              model: CancelEventEntertainer,
              as: 'cancellationDetails',
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
   * get Event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserEvent(req, res) {
    req.user.getEvents().then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.status(200).json({ events });
    });
  },

  /**
   * get User Auction
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserAuctions(req, res) {
    EventEntertainer.findAll({
      where: {
        cancelled: false,
        hireType: EVENT_HIRETYPE.AUCTION,
        userId: req.user.id,
        hiredEntertainer: null, // shown auctions with no hired Entertainer
      },
      include: [
        {
          model: Event,
          as: 'event',
        },
        {
          model: EntertainerProfile,
          as: 'entertainer',
          attributes: [
            'id',
            'stageName',
            'entertainerType',
            'location',
            'about',
          ],
          include: [
            {
              model: User,
              as: 'personalDetails',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        },
        {
          model: Application,
          as: 'applications',
        },
      ],
    }).then((auctions) => {
      if (!auctions || auctions.length === 0) {
        return res.status(404).json({ message: 'Auction not found' });
      }
      return res.status(200).json({ auctions });
    });
  },

  /**
   * get User Requests
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserRequests(req, res) {
    const userId = req.user.id;
    Application.findAll({
      where: {
        applicationType: 'Request',
      },
      include: [
        {
          model: Event,
          as: 'event',
          where: {
            userId,
          },
        },
        {
          model: EventEntertainer,
          as: 'eventEntertainerInfo',
          where: {
            hiredEntertainer: null, // shown requests with no hired Entertainer
          },
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'profileImageURL'],
          include: [
            {
              model: EntertainerProfile,
              as: 'profile',
              attributes: ['id', 'stageName', 'slug'],
            },
          ],
        },
      ],
    }).then((requests) => {
      if (!requests || requests.length === 0) {
        return res.status(404).json({ message: 'No request found' });
      }
      return res.status(200).json({ requests });
    });
  },

  /**
   * get Available Auctions
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getAvailableAuctions(req, res) {
    EventEntertainer.findAll({
      where: {
        cancelled: false,
        hireType: EVENT_HIRETYPE.AUCTION,
        auctionStartDate: { [Op.lte]: Sequelize.literal('NOW()') },
        auctionEndDate: { [Op.gte]: Sequelize.literal('NOW()') },
        entertainerType: {
          [Op.eq]: req.user.profile.entertainerType,
        },
        [Op.and]: Sequelize.literal('applications.id is null'), // only auctions without applications should be shown
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
          where: { userId: req.user.id },
          required: false,
        },
      ],
    }).then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.status(200).json({ events });
    });
  },

  /**
   * get One Event for Entertainer
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneEntertainerEvent(req, res) {
    const userId = req.user.id;
    const id = req.params.eventEntertainerId;
    return EntertainerProfile.findOne({
      where: {
        userId,
      },
    })
      .then((entertainer) => {
        EventEntertainer.findOne({
          where: {
            id,
            hiredEntertainer: entertainer.id,
          },
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
                    'profileImageURL',
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
            return res.status(200).json({ event });
          })
          .catch((error) => {
            const errorMessage = error.message || error;
            return res.status(412).json({ message: errorMessage });
          });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * get Entertainer Event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerEvents(req, res) {
    const userId = req.user.id;
    EntertainerProfile.findOne({
      where: {
        userId,
      },
    }).then((entertainer) => {
      EventEntertainer.findAll({
        where: {
          hiredEntertainer: entertainer.id,
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
        ],
      }).then((events) => {
        if (!events || events.length === 0) {
          return res.status(404).json({ message: 'Events not found' });
        }
        return res.status(200).json({ events });
      });
    });
  },

  /**
   * get One Pending Event Review
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOnePendingEventReview(req, res) {
    const userId = req.user.id;

    EventEntertainer.findOne({
      where: {
        userId,
        hiredEntertainer: {
          [Op.ne]: null,
        },
        [Op.and]: Sequelize.literal(`"eventRating"."id" is null`),
      },
      order: [Sequelize.fn('RANDOM')],
      attributes: ['id', 'placeOfEvent'],
      include: reviewsInclude,
    }).then((info) => {
      if (!info || info.length === 0) {
        return res.json({ message: 'You have no pending review', info: [] });
      }
      return res.status(200).json({ info });
    });
  },

  /**
   * get All Events Review
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getAllEventsReview(req, res) {
    const userId = req.user.id;

    EventEntertainer.findAll({
      where: {
        userId,
        hiredEntertainer: {
          [Op.ne]: null,
        },
      },
      order: [[{ model: Event, as: 'event' }, 'eventDate', 'DESC']],
      attributes: ['id', 'placeOfEvent'],
      include: reviewsInclude,
    }).then((info) => {
      if (!info || info.length === 0) {
        return res
          .status(404)
          .json({ message: 'Event Entertainers not found' });
      }
      return res.status(200).json({ info });
    });
  },

  /**
   * get Event Bids (for user)
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEventBids(req, res) {
    const eventEntertainerId = req.params.id;
    const where = { id: eventEntertainerId };

    if (req.user.type !== USER_TYPES.ADMINISTRATOR) {
      where['userId'] = req.user.id;
    }

    if (!eventEntertainerId) {
      return res
        .status(400)
        .json({ message: 'Kindly provide an event entertainer id' });
    }
    EventEntertainer.findOne({
      where,
      include: [
        {
          model: Event,
          as: 'event',
        },
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
                  attributes: [
                    'id',
                    'stageName',
                    'slug',
                    'entertainerType',
                    'location',
                    'about',
                  ],
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
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }).then((eventEntertainer) => {
      if (!eventEntertainer) {
        return res.status(404).json({ message: 'Event Entertainer not found' });
      }

      if (eventEntertainer.hiredEntertainer) {
        return res
          .status(400)
          .json({ message: 'An entertainer has already been hired' });
      }
      return res.status(200).json({ eventEntertainer });
    });
  },

  /**
   * get Auction Details
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getAuctionDetails(req, res) {
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
                'about',
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

  cancelEvent(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    const cancelledReason = req.body.cancelledReason;

    if (!id) {
      return res.status(404).json({
        message: 'EventId is required to cancel event',
      });
    }

    Event.findOne({
      where: {
        id,
        userId, //need to ensure the owner of the event is making this request
      },
      include: [
        {
          model: EventEntertainer,
          as: 'entertainers',
          include: [
            {
              required: true,
              model: EntertainerProfile,
              as: 'entertainer',
              attributes: [
                'id',
                'stageName',
                'entertainerType',
                'location',
                'about',
              ],
              include: [
                {
                  model: User,
                  as: 'personalDetails',
                  attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'email',
                    'phoneNumber',
                    'profileImageURL',
                  ],
                },
              ],
            },
            {
              model: Application,
              as: 'applications',
              attributes: ['id', 'proposedPrice', 'askingPrice'],
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
      .then(async (event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        if (event.cancelled) {
          return res
            .status(401)
            .json({ message: 'Event has already been cancelled' });
        }
        if (isPast(event.eventDate)) {
          return res
            .status(401)
            .json({ message: 'You cannot cancel a past event' });
        }

        // update event details
        event.update({
          cancelled: true,
          cancelledDate: Date.now(),
          cancelledReason,
        });

        // Add User notification
        await Notification.create({
          userId: userId,
          title: NOTIFICATIONS.USER_CANCEL_EVENT,
          description: `You CANCELLED ${event.eventType}`,
          type: NOTIFICATION_TYPE.DANGER,
          actionId: event.id,
        });

        // inform event entertainers
        // set mail title
        const title = `${event.owner.firstName} Cancelled ${event.eventType}`;

        event.entertainers.map((eventEntertainer) => {
          if (eventEntertainer.cancelled) {
            return null;
          }

          EventEntertainer.update(
            {
              hiredEntertainer: null,
              hiredDate: null,
              cancelled: true,
              cancelledDate: Date.now(),
              cancelledReason,
            },
            {
              where: {
                id: eventEntertainer.id,
              },
            }
          ).then(async () => {
            // add to cancelled
            const amount = parseFloat(
              eventEntertainer.applications[0].proposedPrice ||
                eventEntertainer.applications[0].askingPrice
            );

            const handlingFee =
              (amount * DEFAULT_COMMISSION.handlingPercent) / 100 +
              parseFloat(DEFAULT_COMMISSION.handlingPlus);

            let refundEventOwner = amount - handlingFee;
            let payEntertainerDiscount = 0;

            // calculate amount to refund the user and compensation to entertainer
            const hoursDiff = differenceInHours(
              parse(event.eventDate),
              parse(Date.now())
            );

            if (hoursDiff < 48) {
              payEntertainerDiscount = Math.ceil(ENTERTAINER_DISCOUNT * amount);
              refundEventOwner = amount - payEntertainerDiscount - handlingFee;
            }

            await CancelEventEntertainer.create({
              userId,
              amount,
              eventEntertainerId: eventEntertainer.id,
              cancelledBy: 'User',
              cancelledDate: Date.now(),
              cancelledReason,
              refundEventOwner,
              payEntertainerDiscount,
              hoursDiff,
              applicationId: eventEntertainer.applications[0].id,
            });

            // add entertainer notification
            await Notification.create({
              userId: eventEntertainer.entertainer.personalDetails.id,
              title: NOTIFICATIONS.USER_CANCEL_EVENT,
              description: `${event.owner.firstName} CANCELLED ${event.eventType}`,
              type: NOTIFICATION_TYPE.DANGER,
              actionId: event.id,
            });

            sendMail(
              EMAIL_CONTENT.USER_CANCELLED_EVENT,
              {
                email: eventEntertainer.entertainer.personalDetails.email,
                firstName: eventEntertainer.entertainer.stageName,
              },
              {
                title,
                subject: title,
                contentTop: `We regret to inform you that ${event.owner.firstName} has cancelled ${event.eventType} and therefore, no longer requires your performance/entertainment services to be provided at the event with details stated below.`,
                contentBottom: `
                <strong>Event:</strong> ${event.eventType} <br>
                <strong>Place:</strong> ${eventEntertainer.placeOfEvent} <br>
                <strong>Date:</strong> ${getLongDate(event.eventDate)} <br>
                <strong>Start Time:</strong> ${getTime(event.startTime)} <br>
                <strong>Duration:</strong> ${event.eventDuration} <br>
                <strong>Reason for Cancellation:</strong><br> ${cancelledReason}
              `,
                contentFooter: `Compensation Due: 35% of Take-Home Amount (You are entitled to compensation only If cancellation is done less than 48hrs to event date)
                `,
              }
            );

            // USER CANCELLED EVENT SMS
            await sendSMS({
              message: `We regret to inform you that ${event.owner.firstName} has cancelled '${event.eventType}'.  Check your DUV Live account for more info.`,
              phone: eventEntertainer.entertainer.personalDetails.phoneNumber,
            });
          });
        });

        // Cancel all applications
        await Application.update(
          {
            status: 'Cancelled',
          },
          {
            where: {
              eventId: event.id,
              status: {
                [Op.ne]: REQUEST_ACTION.REJECTED,
              },
            },
          }
        );

        // Cancel Event Entertainers for events that haven't been paid for
        await EventEntertainer.update(
          {
            hiredEntertainer: null,
            hiredDate: null,
            cancelled: true,
            cancelledDate: Date.now(),
            cancelledReason,
          },
          {
            where: {
              eventId: event.id,
              cancelled: false,
            },
          }
        );

        return res.json({ event });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  async getAllEvents(req, res) {
    const {
      entertainerId,
      eventTime,
      highestBudget,
      language,
      limit,
      lowestBudget,
      offset,
    } = req.query;

    // let applicationIsRequired = false;

    try {
      let eventEntertainerQuery = {};
      const eventEntertainerStaticKeys = [
        'auctionEndDate',
        'auctionStartDate',
        'cancelled',
        'hireType',
      ];

      eventEntertainerStaticKeys.forEach((key) => {
        if (req.query[key]) {
          eventEntertainerQuery[key] = req.query[key];
        }
      });

      if (lowestBudget && parseInt(lowestBudget, 10) > 0) {
        eventEntertainerQuery.lowestBudget = { [Op.gte]: lowestBudget };
        // applicationIsRequired = true;
      }
      if (highestBudget && parseInt(highestBudget, 10) > 0) {
        eventEntertainerQuery.highestBudget = { [Op.lte]: highestBudget };
      }

      if (language) {
        // accepts comma seperated languages
        const languages = language.split(',');

        let languageQuery = [];
        for (const lang of languages) {
          languageQuery.push({
            [Op.substring]: lang,
          });
        }
        eventEntertainerQuery.language = {
          [Op.and]: languageQuery,
        };
      }

      const staticKeys = [
        'cancelled',
        'eventType',
        'eventDuration',
        'id',
        'state',
        'userId',
      ];
      const dateKeys = ['cancelledDate', 'eventDate', 'startTime'];
      let eventQuery = {};
      staticKeys.forEach((key) => {
        if (req.query[key]) {
          eventQuery[key] = req.query[key];
        }
      });
      // accepts a range of comma seperated dates (2 max) with the first number as the earliest
      dateKeys.forEach((key) => {
        if (req.query[key]) {
          let [a, b] = req.query[key].split(',');
          let x, y, z;
          if (a && isValid(new Date(a))) {
            x = new Date(a);
            y = new Date(x.getTime() + 3599 * 1000 * 24);
          }
          if (b && isValid(new Date(b))) {
            z = new Date(b);
            y = new Date(z.getTime() + 3599 * 1000 * 24);
          }
          eventQuery[key] = { [Op.between]: [x, y] };
        }
      });

      if (eventTime && eventTime === EVENTDATE_FILTER.PAST) {
        eventQuery.eventDate = { [Op.lte]: Sequelize.literal('NOW()') };
      }
      if (eventTime && eventTime === EVENTDATE_FILTER.FUTURE) {
        eventQuery.eventDate = { [Op.gte]: Sequelize.literal('NOW()') };
        if (req.query['cancelled']) {
          eventQuery.cancelled = {
            [Op.eq]: req.query['cancelled'] === 'YES' ? true : false,
          };
        }
      }

      const applicationKeys = ['applicationType', 'paid', 'status'];
      let applicationQuery = {};
      applicationKeys.forEach((key) => {
        if (req.query[key]) {
          applicationQuery[key] = req.query[key];
        }
      });

      let entertainerProfileQuery = {};
      if (entertainerId) {
        entertainerProfileQuery.id = entertainerId;
      }

      const eventInclude = [
        {
          model: EventEntertainer,
          as: 'entertainers',
          where: eventEntertainerQuery,
          include: [
            {
              model: EntertainerProfile,
              as: 'entertainer',
              where: entertainerProfileQuery,
              attributes: [
                'id',
                'stageName',
                'entertainerType',
                'location',
                'about',
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
              required: false,
            },
            {
              model: Application,
              as: 'applications',
              where: applicationQuery,
              required: false,
            },
          ],
          required: false,
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
          required: false,
        },
      ];

      const options = {
        offset: offset || 0,
        limit: limit || 10,
        where: eventQuery,
        include: eventInclude,
      };

      try {
        const { result, pagination } = await getAll(Event, options);
        return res.status(200).json({ events: result, pagination });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  /**
   * get Past Events
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async getPastEvents(req, res) {
    const { entertainerId, entertainerType, limit, offset, review } = req.query;

    try {
      let eventEntertainerQuery = {};

      if (entertainerType) {
        eventEntertainerQuery.entertainerType = entertainerType;
      }
      if (entertainerId) {
        eventEntertainerQuery.hiredEntertainer = entertainerId;
      }

      const eventKeys = ['id', 'userId'];

      eventKeys.forEach((key) => {
        if (req.query[key]) {
          eventEntertainerQuery[key] = req.query[key];
        }
      });

      let reviewQuery = {};
      reviewQuery.review =
        review === 'YES' ? { [Op.ne]: null } : { [Op.eq]: null };

      const eventInclude = [
        {
          model: EventEntertainer,
          as: 'entertainers',
          where: eventEntertainerQuery,
          required: !!entertainerType,
          include: [
            {
              model: EntertainerProfile,
              as: 'entertainer',
              required: !!entertainerId,
              duplicating: !!entertainerId,
              attributes: [
                'id',
                'stageName',
                'entertainerType',
                'location',
                'about',
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
              model: Rating,
              as: 'eventRating',
              where: reviewQuery,
              required: review === 'YES',
              duplicating: review === 'YES',
              attributes: ['review', 'overallTalent', 'recommend'],
            },
          ],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
          required: false,
        },
      ];

      const options = {
        offset: offset || 0,
        limit: limit || 10,
        where: { eventDate: { [Op.lte]: Sequelize.literal('NOW()') } },
        include: eventInclude,
      };

      try {
        const { result, pagination } = await getAll(Event, options);
        return res.status(200).json({
          events: result,
          pagination,
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  /**
   * get All Unrated Events
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async getAllUnratedEvents(req, res) {
    const { limit, offset } = req.query;
    try {
      const options = {
        offset: offset || 0,
        limit: limit || 10,
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
        const { result, pagination } = await getAll(EventEntertainer, options);
        return res.status(200).json({
          events: result,
          pagination,
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },
  // update event details
  // inform entertainer
  // add to admin (how do I process)
  // refund entertainer
  // refund user

  /**
   * get Available Auctions For Admin
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getAvailableAuctionsForAdmin(req, res) {
    EventEntertainer.findAll({
      where: {
        cancelled: false,
        hireType: EVENT_HIRETYPE.AUCTION,
        auctionStartDate: { [Op.lte]: Sequelize.literal('NOW()') },
        auctionEndDate: { [Op.gte]: Sequelize.literal('NOW()') },
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
          where: { userId: req.user.id },
          required: false,
        },
      ],
    }).then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.status(200).json({ events });
    });
  },

  /**
   * get Admin Requests
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getAdminRequests(req, res) {
    Application.findAll({
      where: {
        applicationType: 'Request',
      },
      order: [['expiryDate', 'DESC']],
      limit: 100,
      include: [
        {
          model: Event,
          as: 'event',
        },
        {
          model: EventEntertainer,
          as: 'eventEntertainerInfo',
          // where: {
          //   hiredEntertainer: null, // shown requests with no hired Entertainer
          // },
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'profileImageURL'],
          include: [
            {
              model: EntertainerProfile,
              as: 'profile',
              attributes: ['id', 'stageName', 'slug'],
            },
          ],
        },
      ],
    }).then((requests) => {
      if (!requests || requests.length === 0) {
        return res.status(404).json({ message: 'No request found' });
      }
      return res.status(200).json({ requests });
    });
  },
};

export default EventController;
