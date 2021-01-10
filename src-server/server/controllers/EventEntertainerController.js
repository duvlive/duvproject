import { Op } from 'sequelize';
import {
  Application,
  EntertainerProfile,
  EventEntertainer,
  Commission,
  Event,
  User,
  Rating,
  Notification,
  CancelEventEntertainer,
} from '../models';
import { getLongDate, getTime, moneyFormat, validString } from '../utils';
import EMAIL_CONTENT from '../email-template/content';
import { DEFAULT_COMMISSION } from './CommissionController';
import { priceCalculatorHelper } from '../utils/priceCalculator';
import {
  ENTERTAINER_DISCOUNT,
  NOTIFICATIONS,
  NOTIFICATION_TYPE,
} from '../constant';
import sendMail from '../MailSender';
import { addDays } from 'date-fns';
import { differenceInHours, parse } from 'date-fns';
import { sendSMS } from '../SMSSender';

const sendRequestMail = ({
  askingPrice,
  takeHome,
  email,
  placeOfEvent,
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
    <strong>Place:</strong> ${placeOfEvent} <br>
    <strong>Date:</strong> ${getLongDate(event.eventDate)} <br>
    <strong>Start Time:</strong> ${getTime(event.startTime)} <br>
    <strong>Duration:</strong> ${event.eventDuration} <br>
    <strong>Offer Amount:</strong> ₦${moneyFormat(askingPrice)} <br>
    <strong>Take Home Pay:</strong> ₦${moneyFormat(takeHome)} <br>
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
          attributes: ['email', 'phoneNumber', 'commissionId'],
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
            const commissionQuery = entertainerDetails.commissionId
              ? { id: entertainerDetails.commissionId }
              : { default: true };
            const defaultCommission = await Commission.findOne({
              where: commissionQuery,
            });

            // calculate commission
            const commission = defaultCommission || DEFAULT_COMMISSION;

            const { entertainerFee } = priceCalculatorHelper(
              askingPrice,
              commission,
              hireType
            );

            const savedApplication = await Application.create({
              userId: entertainerId,
              askingPrice,
              eventId,
              commissionId: commission.id,
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
                placeOfEvent,
                stageName: entertainerDetails.profile.stageName,
                event,
              });

              // ENTERTAINER REQUEST SMS
              await sendSMS({
                message: `YIPEE!!! You have a request to perform at '${event.eventType}' event. Check your DUV Live account for more info`,
                phone: entertainerDetails.phoneNumber,
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

  entertainerNotAvailable(req, res) {
    const eventEntertainerId = req.params.id;
    const userId = req.user.id;
    const entertainerId = req.user.profile.id;
    const cancelledReason = req.body.cancelledReason;

    if (!eventEntertainerId) {
      return res
        .status(400)
        .json({ message: 'Kindly provide an event entertainer info id' });
    }

    EventEntertainer.findOne({
      where: { id: eventEntertainerId, hiredEntertainer: entertainerId },
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
    })
      .then((eventEntertainerInfo) => {
        if (!eventEntertainerInfo) {
          return res
            .status(404)
            .json({ message: 'Event Entertainer Info not found' });
        }

        // update event details
        EventEntertainer.update(
          {
            hiredEntertainer: null,
            hiredDate: null,
          },
          {
            where: {
              id: eventEntertainerInfo.id,
            },
          }
        ).then(async () => {
          // Update application to cancelled
          await Application.update(
            {
              status: 'Cancelled',
            },
            {
              where: {
                id: eventEntertainerInfo.applications[0].id,
              },
            }
          );

          // Add to cancellation table
          const amount =
            eventEntertainerInfo.applications[0].proposedPrice ||
            eventEntertainerInfo.applications[0].askingPrice;

          let refundEventOwner = amount;
          let payEntertainerDiscount = 0;

          // calculate amount to refund the user and compensation to entertainer
          const hoursDiff = differenceInHours(
            parse(eventEntertainerInfo.event.eventDate),
            parse(Date.now())
          );

          await CancelEventEntertainer.create({
            userId,
            amount,
            hoursDiff,
            eventEntertainerId: eventEntertainerInfo.id,
            cancelledBy: 'Entertainer',
            cancelledDate: Date.now(),
            cancelledReason,
            refundEventOwner,
            payEntertainerDiscount,
            applicationId: eventEntertainerInfo.applications[0].id,
          });

          // Update cancelled event
          // add to entertainer notification
          const stageName = req.user.profile.stageName;
          const title = `${stageName} Cancelled Performance At ${eventEntertainerInfo.event.eventType}`;

          // add to entertainer notification
          await Notification.create({
            userId,
            title: NOTIFICATIONS.ENTERTAINER_NOT_AVAILABLE,
            description: `You CANCELLED Performance At ${eventEntertainerInfo.event.eventType}`,
            type: NOTIFICATION_TYPE.DANGER,
            actionId: eventEntertainerInfo.id,
          });

          // add to user notification
          await Notification.create({
            userId: eventEntertainerInfo.event.owner.id,
            title: NOTIFICATIONS.ENTERTAINER_NOT_AVAILABLE,
            description: title,
            type: NOTIFICATION_TYPE.DANGER,
            actionId: eventEntertainerInfo.id,
          });

          sendMail(
            EMAIL_CONTENT.ENTERTAINER_CANCELLED_EVENT,
            {
              email: eventEntertainerInfo.event.owner.email,
              firstName: eventEntertainerInfo.event.owner.firstName,
            },
            {
              title,
              buttonText: 'Proceed To Dashboard',
              link: `${process.env.HOST}/user/dashboard`,
              subject: title,
              contentTop: `We regret to inform you that ${stageName} has cancelled his performance/entertainment service meant to be provided at the event with details stated below.`,
              contentBottom: `
                <strong>Event:</strong> ${
                  eventEntertainerInfo.event.eventType
                } <br>
                <strong>Place:</strong> ${
                  eventEntertainerInfo.placeOfEvent
                } <br>
                <strong>Date:</strong> ${getLongDate(
                  eventEntertainerInfo.event.eventDate
                )} <br>
                <strong>Start Time:</strong> ${getTime(
                  eventEntertainerInfo.event.startTime
                )} <br>
                <strong>Duration:</strong> ${
                  eventEntertainerInfo.event.eventDuration
                } <br>
                <strong>Charge Amount:</strong> ₦${moneyFormat(amount)} <br><br>
                <strong>Reason for Cancellation:</strong><br> ${cancelledReason}
              `,
              contentFooter: `No worries. You can try hiring other entertainers by heading to your dashboard.`,
            }
          );

          // USER CANCELLED EVENT SMS
          await sendSMS({
            message: `We regret to inform you that ${stageName} has cancelled his service for the '${eventEntertainerInfo.event.eventType}' event. Check your DUV Live account for more info`,
            phone: eventEntertainerInfo.event.owner.phoneNumber,
          });

          return res.json({ eventEntertainerInfo });
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  },

  userRemoveEntertainer(req, res) {
    const eventEntertainerId = req.params.id;
    const userId = req.user.id;
    const cancelledReason = req.body.cancelledReason;

    if (!eventEntertainerId) {
      return res
        .status(400)
        .json({ message: 'Kindly provide an event entertainer info id' });
    }

    EventEntertainer.findOne({
      where: {
        id: eventEntertainerId,
        userId,
        cancelled: false,
        hiredEntertainer: {
          [Op.ne]: null,
        },
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
                'email',
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
      ],
    })
      .then((eventEntertainerInfo) => {
        if (!eventEntertainerInfo) {
          return res
            .status(404)
            .json({ message: 'Event Entertainer Info not found' });
        }

        const event = eventEntertainerInfo.event;
        const entertainer = eventEntertainerInfo.entertainer;

        // update event details
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
              id: eventEntertainerId,
            },
          }
        ).then(async () => {
          // Update application to cancelled
          await Application.update(
            {
              status: 'Cancelled',
            },
            {
              where: {
                id: eventEntertainerInfo.applications[0].id,
              },
            }
          );

          // Add to cancellation table
          const amount = parseFloat(
            eventEntertainerInfo.applications[0].proposedPrice ||
              eventEntertainerInfo.applications[0].askingPrice
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
            hoursDiff,
            eventEntertainerId: eventEntertainerInfo.id,
            cancelledBy: 'User',
            cancelledDate: Date.now(),
            cancelledReason,
            refundEventOwner,
            payEntertainerDiscount,
            applicationId: eventEntertainerInfo.applications[0].id,
          });

          // set mail title
          const title = `${event.owner.firstName} Cancelled ${event.eventType}`;

          // add to entertainer notification
          await Notification.create({
            userId: entertainer.id,
            title: NOTIFICATIONS.USER_REMOVE_ENTERTAINER,
            description: title,
            type: NOTIFICATION_TYPE.DANGER,
            actionId: eventEntertainerInfo.id,
          });

          // add to user notification
          await Notification.create({
            userId,
            title: NOTIFICATIONS.USER_REMOVE_ENTERTAINER,
            description: `You CANCELLED ${event.eventType}`,
            type: NOTIFICATION_TYPE.DANGER,
            actionId: eventEntertainerInfo.id,
          });

          sendMail(
            EMAIL_CONTENT.USER_CANCELLED_EVENT,
            {
              email: entertainer.personalDetails.email,
              firstName: entertainer.stageName,
            },
            {
              title,
              subject: title,
              contentTop: `We regret to inform you that ${event.owner.firstName} has cancelled ${event.eventType} and therefore, no longer requires your performance/entertainment services to be provided at the event with details stated below.`,
              contentBottom: `
              <strong>Event:</strong> ${event.eventType} <br>
              <strong>Place:</strong> ${eventEntertainerInfo.placeOfEvent} <br>
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
            message: `We regret to inform you that ${event.owner.firstName} has cancelled '${event.eventType}'. Check your DUV Live account for more info.`,
            phone: entertainer.personalDetails.phoneNumber,
          });

          return res.json({ eventEntertainerInfo });
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  },
};

export default EventEntertainerController;
