import { Op } from 'sequelize';
import {
  Application,
  Event,
  EventEntertainer,
  User,
  EntertainerProfile,
  Commission,
  Notification,
} from '../models';
import sendMail from '../MailSender';
import { validString, moneyFormat, getLongDate, getTime } from '../utils';
import {
  USER_TYPES,
  NOTIFICATIONS,
  NOTIFICATION_TYPE,
  REQUEST_ACTION,
} from '../constant';
import EMAIL_CONTENT from '../email-template/content';

const ApplicationController = {
  /**
   * create Application
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  entertainerApplication(req, res) {
    const { status, askingPrice, eventId, eventEntertainerId, id } = req.body;

    const error = {
      ...validString(status),
      ...validString(askingPrice),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newApplication = {};
    if (!id) {
      return Application.create({
        status,
        askingPrice,
        eventId,
        eventEntertainerId,
        userId: req.user.id,
      })
        .then((application) => {
          newApplication = application;
          return req.user.addApplication(application);
        })
        .then(() => {
          return res.status(200).json({
            message: 'Application created successfully',
            application: newApplication,
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
      .getApplications({ where: { id } })
      .then((applications) => {
        if (applications && applications.length > 0) {
          if (req.user.type === USER_TYPES.ADMINISTRATOR) {
            return applications[0].update({
              status,
            });
          }
          return applications[0].update({
            askingPrice,
          });
        }
        throw `No Application with id ${id}`;
      })
      .then((event) => {
        return res.status(200).json({
          message: 'Application updated successfully',
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
   * get Application
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerApplications(req, res) {
    req.user.getEvents().then((applications) => {
      if (!applications || applications.length === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
      return res.status(200).json({ applications });
    });
  },

  /**
   * get Entertainers Bids
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerBids(req, res) {
    return req.user
      .getApplications({
        where: {
          applicationType: 'Bid',
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
            model: EventEntertainer,
            as: 'eventEntertainerInfo',
          },
        ],
      })
      .then((bids) => {
        if (!bids || bids.length === 0) {
          return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json({ bids });
      });
  },

  /**
   * get Entertainers Request
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerRequest(req, res) {
    return req.user
      .getApplications({
        where: {
          applicationType: 'Request',
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
            model: EventEntertainer,
            as: 'eventEntertainerInfo',
          },
        ],
      })
      .then((requests) => {
        if (!requests || requests.length === 0) {
          return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json({ requests });
      });
  },

  /**
   * process Entertainer response to User Request
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  processRequestApplication(req, res) {
    const userId = req.user.id;
    const applicationId = req.params.applicationId;
    const action = req.body.action;
    const proposedPrice = req.body.proposedPrice;
    const rejectionReason = req.body.rejectionReason;

    if (!applicationId || !action) {
      return res.status(404).json({
        message: 'Application Id and Action needed to process application',
      });
    }

    if (!Object.keys(REQUEST_ACTION).includes(action.toUpperCase())) {
      return res.status(400).json({
        message: `${action} is not a valid action. Action should be one of Approved, Rejected or Increment`,
      });
    }

    if (action === REQUEST_ACTION.INCREASE && !proposedPrice) {
      return res.status(400).json({
        message: 'Proposed Price is needed in you are asking for an increment',
      });
    }

    Application.findOne({
      where: { id: applicationId, userId },
      include: [
        {
          model: EventEntertainer,
          as: 'eventEntertainerInfo',
          include: {
            model: Event,
            as: 'event',
            include: [
              {
                model: User,
                as: 'owner',
                attributes: ['id', 'firstName', 'lastName', 'email'],
              },
            ],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: ['email'],
          include: [
            {
              model: EntertainerProfile,
              as: 'profile',
              attributes: ['id', 'stageName'],
            },
          ],
        },
      ],
    })
      .then((application) => {
        const currentDate = Date.now();

        // for email
        const EMAIL_PARAMS = {
          askingPrice: moneyFormat(application.askingPrice),
          proposedPrice: REQUEST_ACTION.REQUEST_INCREMENT
            ? moneyFormat(proposedPrice)
            : 0,
          userName: application.eventEntertainerInfo.event.owner.firstName,
          userEmail: application.eventEntertainerInfo.event.owner.email,
          entertainerName: application.user.profile.stageName,
          eventType: application.eventEntertainerInfo.event.eventType,
          eventDate: getLongDate(
            application.eventEntertainerInfo.event.eventDate
          ),
        };

        if (!application) {
          return res.status(404).json({ message: 'Application not found' });
        }
        console.log('------');
        console.log('------');
        console.log('------');
        console.log('------');
        console.log('------');
        console.log('application.status', application.status);
        // application has previously been approved
        if (application.status !== 'Pending') {
          return res.status(401).json({
            message: 'This application has already been processed',
          });
        }

        // application is only valid if it has no hiredEntertainer
        if (application.eventEntertainerInfo.hiredEntertainer) {
          return res.status(400).json({
            message:
              'Application is no longer valid. An entertainer has been selected for event',
          });
        }

        let updateConditions;
        let notificationCondition;
        let description;

        switch (action) {
          /*
           * user can accept, reject, ask for increment
           * accept - status = approved,approvedDate => now
           * reject - status => rejected, rejectionReason, rejectionDate = now
           * increment - proposedPrice, rejectionReason, rejection Date = now
           */

          case REQUEST_ACTION.APPROVED:
            updateConditions = {
              status: REQUEST_ACTION.APPROVED,
              approvedDate: currentDate,
            };
            description = `Yippeee! ${EMAIL_PARAMS.entertainerName} accepted your request (NGN ${EMAIL_PARAMS.askingPrice}) for ${EMAIL_PARAMS.eventType}`;
            notificationCondition = {
              title: NOTIFICATIONS.REQUEST_ACCEPTED,
              type: NOTIFICATION_TYPE.SUCCESS,
            };
            break;

          case REQUEST_ACTION.INCREMENT:
            updateConditions = {
              status: REQUEST_ACTION.INCREMENT,
              approvedDate: currentDate,
              proposedPrice,
            };
            description = `${EMAIL_PARAMS.entertainerName} wants a payment of (NGN ${EMAIL_PARAMS.proposedPrice}) for ${EMAIL_PARAMS.eventType}`;
            notificationCondition = {
              title: NOTIFICATIONS.REQUEST_INCREMENT,
              type: NOTIFICATION_TYPE.INFO,
            };
            break;

          case REQUEST_ACTION.REJECTED:
            updateConditions = {
              status: REQUEST_ACTION.REJECTED,
              rejectionReason,
              rejectionDate: currentDate,
            };
            description = `Unfortunately, ${EMAIL_PARAMS.entertainerName} rejected your request for ${EMAIL_PARAMS.eventType}`;
            notificationCondition = {
              title: NOTIFICATIONS.REQUEST_REJECTED,
              type: NOTIFICATION_TYPE.DANGER,
            };
            break;

          default:
            break;
        }

        // updated approved application
        return Application.update(updateConditions, {
          where: {
            id: applicationId,
            userId,
          },
        }).then(async () => {
          // notification
          await Notification.create({
            ...notificationCondition,
            actionId: applicationId, //application id
            description,
            userId: application.eventEntertainerInfo.event.owner.id,
          });

          // send mail to user
          await sendRequestMail({
            ...EMAIL_PARAMS,
            ...updateConditions,
            description,
          });

          // response
          res.json({
            application: { ...application.toJSON(), ...updateConditions },
            message: 'Your response has been recorded. Thank you.',
          });
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * Get application for valid entertainer only
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */

  getOneApplication(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    if (!id) {
      return res.status(404).json({
        message: 'Application Id needed to approve application',
      });
    }

    Application.findOne({
      where: { id, userId },
      include: [
        {
          model: EventEntertainer,
          as: 'eventEntertainerInfo',
          include: {
            model: Event,
            as: 'event',
            include: [
              {
                model: User,
                as: 'owner',
                attributes: ['id', 'firstName', 'lastName'],
              },
            ],
          },
        },
        {
          model: Commission,
          as: 'commission',
        },
      ],
    })
      .then((application) => {
        if (!application) {
          return res.status(404).json({ message: 'Application not found' });
        }
        return res.json({ application });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * Approve Application
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  approveAuctionsApplication(req, res) {
    // const currentDate = Date.now();
    const id = req.params.applicationId;

    if (!id) {
      return res.status(404).json({
        message: 'Application Id needed to approve application',
      });
    }

    Application.findOne({
      where: { id },
      include: [
        {
          model: EventEntertainer,
          as: 'eventEntertainerInfo',
          include: {
            model: Event,
            as: 'event',
          },
        },
        {
          model: User,
          as: 'user',
          attributes: ['email'],
          include: [
            {
              model: EntertainerProfile,
              as: 'profile',
              attributes: ['id', 'stageName'],
            },
          ],
        },
      ],
    })
      .then((application) => {
        const currentDate = Date.now();
        const eventEntertainerId = application.eventEntertainerId;
        // for email
        const EMAIL_PARAMS = {
          askingPrice: moneyFormat(application.askingPrice),
          entertainerName: application.user.profile.stageName,
          entertainerEmail: application.user.email,
          eventType: application.eventEntertainerInfo.event.eventType,
          eventPlace: application.eventEntertainerInfo.placeOfEvent,
          eventDate: getLongDate(
            application.eventEntertainerInfo.event.eventDate
          ),
          eventStart: getTime(application.eventEntertainerInfo.event.startTime),
          eventDuration: application.eventEntertainerInfo.event.eventDuration,
          eventStreetLine1: application.eventEntertainerInfo.event.streetLine1,
          eventStreetLine2: application.eventEntertainerInfo.event.streetLine2,
          eventState: application.eventEntertainerInfo.event.state,
          eventLga: application.eventEntertainerInfo.event.lga,
          eventCity: application.eventEntertainerInfo.event.city,
        };

        if (!application) {
          return res.status(404).json({ message: 'Application not found' });
        }

        // application has previously been approved
        if (application.status === 'Approved') {
          return res.status(200).json({
            application,
            message: 'This application has already been approved',
          });
        }

        // can only approve applications without hiredEntertainer
        if (application.eventEntertainerInfo.hiredEntertainer) {
          return res.status(400).json({
            message: 'You have hired an entertainer for this request.',
          });
        }

        // for Auctions, only owners of events can approve an application
        if (
          application.eventEntertainerInfo.hireType === 'Auction' &&
          application.eventEntertainerInfo.userId !== req.user.id
        ) {
          return res.status(401).json({
            message: 'Only event owners can approve a bid application',
          });
        }

        // updated approved application
        return Application.update(
          { status: 'Approved', approvedDate: currentDate },
          {
            where: {
              id,
            },
          }
        ).then(() => {
          // add approved entertainer to evententertainer
          EventEntertainer.update(
            {
              hiredEntertainer: application.user.profile.id,
              hiredDate: currentDate,
            },
            {
              where: {
                id: eventEntertainerId,
              },
            }
          ).then(() =>
            Application.update(
              // reject other bids
              {
                status: 'Rejected',
                rejectionDate: currentDate,
                rejectionReason: 'Application not selected',
              },
              {
                where: {
                  id: { [Op.ne]: id },
                  eventEntertainerId: application.eventEntertainerInfo.id,
                },
              }
            ).then(async () => {
              // Send Email to approved entertainer
              sendAuctionMail(EMAIL_PARAMS);
              await Notification.create({
                userId: application.user.profile.id,
                title: NOTIFICATIONS.BID_APPROVED,
                description: `Your bid NGN (${EMAIL_PARAMS.askingPrice}) for ${EMAIL_PARAMS.eventType} has been approved`,
                type: NOTIFICATION_TYPE.SUCCESS,
                actionId: id, //application id
              });
              res.json({
                application,
                message:
                  'Entertainer Application has been successfully approved',
              });
            })
          );
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },
};

const sendAuctionMail = (params) => {
  // Build Email
  const contentTop = `Congratulations!!! Your bid of  NGN ${params.askingPrice} has been approved. Once payment has been made, then your application has been confirmed. You can find the details of the event below.`;
  const contentBottom = `
    <strong>Event:</strong> ${params.eventType} <br>
    <strong>Place:</strong> ${params.eventPlace} <br>
    <strong>Date:</strong> ${params.eventDate} <br>
    <strong>Start Time:</strong> ${params.eventStart} <br>
    <strong>Duration:</strong> ${params.eventDuration} <br>
    <strong>Street Line 1:</strong> ${params.eventStreetLine1} <br>
    <strong>Street Line 2:</strong> ${params.eventStreetLine2} <br>
    <strong>State:</strong> ${params.eventState} <br>
    <strong>LGA:</strong> ${params.eventLga} <br>
    <strong>City:</strong> ${params.eventCity} <br>
  `;
  sendMail(
    EMAIL_CONTENT.APPROVED_BID,
    { email: params.entertainerEmail },
    {
      firstName: params.entertainerName,
      title: `Your Bid of NGN ${params.askingPrice} has been approved`,
      link: '#',
      contentTop,
      contentBottom,
    }
  );
};

const sendRequestMail = (params) => {
  // Build Email
  const contentTop = `
    <strong>Event:</strong> ${params.eventType} <br>
    <strong>Place:</strong> ${params.eventPlace} <br>
    <strong>Date:</strong> ${params.eventDate} <br>
    <strong>Price:</sttrong> NGN ${
      params.proposedPrice || params.askingPrice
    } <br>
  `;
  sendMail(
    {
      subject: `[D.U.V LIVE ] ${params.description}`,
      firstName: params.userName,
      title: params.description,
      buttonText: 'See Details',
      link: '#',
      contentTop,
    },
    { email: params.userEmail }
  );
};

export default ApplicationController;
