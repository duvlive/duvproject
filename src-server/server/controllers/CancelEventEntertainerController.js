import EMAIL_CONTENT from '../email-template/content';
import sendMail from '../MailSender';
import {
  Application,
  CancelEventEntertainer,
  Event,
  EventEntertainer,
  User,
  EntertainerProfile,
  BankDetail,
} from '../models';
import { sendSMS } from '../SMSSender';
import {
  encodeAccountNumber,
  getAll,
  getDateTime,
  moneyFormat,
} from '../utils';

const CANCEL_EVENT_INCLUDE = [
  {
    model: EventEntertainer,
    as: 'eventEntertainer',
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
              'email',
              'profileImageURL',
              'accountName',
              'accountNumber',
              'bankName',
            ],
          },
        ],
      },
    ],
  },
  {
    model: Application,
    as: 'eventApplication',
    required: true,
    attributes: [
      'id',
      'commissionId',
      'askingPrice',
      'applicationType',
      'proposedPrice',
      'takeHome',
      'createdAt',
    ],
    include: [
      {
        model: User,
        as: 'user',
        attributes: [
          'id',
          'profileImageURL',
          'phoneNumber',
          'phoneNumber2',
          'email',
          'firstName',
        ],
        include: [
          {
            model: EntertainerProfile,
            as: 'profile',
            attributes: [
              'id',
              'stageName',
              'entertainerType',
              'slug',
              'location',
            ],
          },
          {
            model: BankDetail,
            as: 'bankDetail',
          },
        ],
      },
    ],
  },
];

const CancelEventEntertainerController = {
  /**
   * @desc get global notification
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getCancelEventEntertainers(req, res) {
    const { offset, limit, resolved } = req.query;
    try {
      const where = {
        resolved: !!resolved,
      };
      const include = [
        {
          model: EventEntertainer,
          as: 'eventEntertainer',
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
          ],
        },
        {
          model: Application,
          as: 'eventApplication',
          required: true,
          attributes: [
            'id',
            'commissionId',
            'askingPrice',
            'applicationType',
            'proposedPrice',
            'takeHome',
            'createdAt',
          ],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'profileImageURL'],
              include: [
                {
                  model: EntertainerProfile,
                  as: 'profile',
                  attributes: [
                    'id',
                    'stageName',
                    'entertainerType',
                    'slug',
                    'location',
                  ],
                },
              ],
            },
          ],
        },
      ];
      const options = {
        offset: offset || 0,
        limit: limit || 10,
        include,
        where,
      };
      try {
        const { result, pagination } = await getAll(
          CancelEventEntertainer,
          options
        );
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

  async getOneCancelEventEntertainers(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        message: 'Id needed to view details',
      });
    }

    CancelEventEntertainer.findOne({
      where: {
        id,
      },
      include: CANCEL_EVENT_INCLUDE,
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        return res.json({ event });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * Resolve User refund
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  resolveUserRefund(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    CancelEventEntertainer.findOne({
      where: { id },
      include: CANCEL_EVENT_INCLUDE,
    })
      .then((eventFound) => {
        if (!eventFound || eventFound.length === 0) {
          return res
            .status(404)
            .json({ message: 'Event Entertainer not found' });
        }
        if (eventFound.resolved || eventFound.eventOwnerRefunded) {
          return res.status(403).json({
            message:
              'Event has already been  resolved as event owner has been refunded',
          });
        }

        const resolvedOptions =
          parseInt(eventFound.payEntertainerDiscount, 10) === 0
            ? {
                resolved: true,
                resolvedBy: userId,
              }
            : {};

        return CancelEventEntertainer.update(
          {
            eventOwnerRefunded: true,
            refundEventOwnerDate: new Date().toISOString(),
            ...resolvedOptions,
          },
          {
            where: {
              id,
            },
          }
        ).then(async () => {
          const emailContent = {
            title: `You have been refunded ₦${moneyFormat(
              eventFound.refundEventOwner
            )}`,
            event: eventFound.eventEntertainer.event.eventType,
            place: eventFound.eventEntertainer.placeOfEvent,
            date: getDateTime(eventFound.eventEntertainer.event.eventDate),
            cancelledReason: eventFound.cancelledReason,
            cancelledTime: getDateTime(eventFound.createdAt),
            initialPay: moneyFormat(eventFound.amount),
            amountDeducted: moneyFormat(
              eventFound.amount - eventFound.refundEventOwner
            ),
            amountRefunded: moneyFormat(eventFound.refundEventOwner),
            bank: eventFound.eventEntertainer.event.owner.bankName,
            accountNumber: encodeAccountNumber(
              eventFound.eventEntertainer.event.owner.accountNumber
            ),
            user: {
              email: eventFound.eventEntertainer.event.owner.email,
              firstName: eventFound.eventEntertainer.event.owner.firstName,
            },
          };
          sendMail(
            EMAIL_CONTENT.REFUND_USER,
            {
              ...emailContent.user,
            },
            {
              title: emailContent.title,
              subject: emailContent.title,
              contentTop: `We are pleased to inform you that after the cancellation of the event with details below, you have been refunded the amount stated which has been credited to the bank account number you provided.`,
              contentBottom: `
              <strong>Event:</strong> ${emailContent.event} <br>
              <strong>Place:</strong> ${emailContent.place} <br>
              <strong>Date & Time:</strong> ${emailContent.date} <br><br>

              <strong>Time of Cancellation:</strong> ${emailContent.cancelledTime}<br>
              <strong>Reason for Cancellation:</strong><br> ${emailContent.cancelledReason}<br><br>

              <strong>Initial Pay:</strong> ₦${emailContent.initialPay} <br>
              <strong>Amount Deducted:</strong> ₦${emailContent.amountDeducted} <br>
              <strong>Amount Refunded:</strong> ₦${emailContent.amountRefunded} <br><br>

              <strong>Bank:</strong> ${emailContent.bank} <br>
              <strong>Account Number:</strong> ${emailContent.accountNumber} <br><br>
            `,
            }
          );

          // REFUND USER SMS
          await sendSMS({
            message: `You have been refunded with NGN ${emailContent.amountRefunded}. Check your DUV Live account for more info`,
            phone: eventFound.eventEntertainer.event.owner.phoneNumber,
          });
          return res
            .status(200)
            .json({ message: 'Event has been successfully resolved' });
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(500).json({ message: errorMessage });
      });
  },

  /**
   * Resolve Entertainer refund
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  resolveEntertainerRefund(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    CancelEventEntertainer.findOne({
      where: { id },
      include: CANCEL_EVENT_INCLUDE,
    })
      .then((eventFound) => {
        if (!eventFound || eventFound.length === 0) {
          return res
            .status(404)
            .json({ message: 'Event Entertainer not found' });
        }
        if (eventFound.resolved || eventFound.entertainerPaid) {
          return res.status(403).json({
            message: 'Event has already been resolved',
          });
        }
        if (parseInt(eventFound.payEntertainerDiscount, 10) === 0) {
          return res.status(403).json({
            message:
              'Entertainer has no refund, hence, the event can only be resolved for the event owner',
          });
        }

        const resolvedOptions = eventFound.eventOwnerRefunded
          ? {
              resolved: true,
              resolvedBy: userId,
            }
          : {};

        // Cancel Performance --> For entertainers
        return CancelEventEntertainer.update(
          {
            entertainerPaid: true,
            paidEntertainerOn: new Date().toISOString(),
            ...resolvedOptions,
          },
          {
            where: {
              id,
            },
          }
        ).then(async () => {
          const emailContent = {
            title: `You have been compensated with ₦${moneyFormat(
              eventFound.payEntertainerDiscount
            )}`,
            event: eventFound.eventEntertainer.event.eventType,
            place: eventFound.eventEntertainer.placeOfEvent,
            date: getDateTime(eventFound.eventEntertainer.event.eventDate),
            cancelledReason: eventFound.cancelledReason,
            cancelledTime: getDateTime(eventFound.createdAt),
            initialTakeHome: moneyFormat(eventFound.eventApplication.takeHome),
            amountCompensated: moneyFormat(eventFound.payEntertainerDiscount),
            bank: eventFound.eventApplication.user.bankDetail.bankName,
            accountNumber: encodeAccountNumber(
              eventFound.eventApplication.user.bankDetail.accountNumber
            ),
            user: {
              email: eventFound.eventApplication.user.email,
              firstName: eventFound.eventApplication.user.profile.stageName,
            },
          };
          sendMail(
            EMAIL_CONTENT.REFUND_ENTERTAINER,
            {
              ...emailContent.user,
            },
            {
              title: emailContent.title,
              subject: emailContent.title,
              contentTop: `We are pleased to inform you that after the cancellation of the event with details below, you have been compensated the amount stated which has been credited to the bank account number you provided.
              `,
              contentBottom: `
              <strong>Event:</strong> ${emailContent.event} <br>
              <strong>Place:</strong> ${emailContent.place} <br>
              <strong>Date & Time:</strong> ${emailContent.date} <br><br>

              <strong>Time of Cancellation:</strong> ${emailContent.cancelledTime}<br>
              <strong>Reason for Cancellation:</strong><br> ${emailContent.cancelledReason}<br><br>

              <strong>Initial Take-Home Pay:</strong> ₦${emailContent.initialTakeHome} <br>
              <strong>Amount Compensated:</strong> ₦${emailContent.amountCompensated} <br><br>

              <strong>Bank:</strong> ${emailContent.bank} <br>
              <strong>Account Number:</strong> ${emailContent.accountNumber} <br><br>
            `,
            }
          );

          // REFUND ENTERTAINER SMS
          await sendSMS({
            message: `You have been compensated with NGN ${emailContent.amountCompensated}. Check your DUV Live account for more info`,
            phone: eventFound.eventApplication.user.phoneNumber,
          });
          return res
            .status(200)
            .json({ message: 'Event has been successfully resolved' });
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(500).json({ message: errorMessage });
      });
  },
};

export default CancelEventEntertainerController;
