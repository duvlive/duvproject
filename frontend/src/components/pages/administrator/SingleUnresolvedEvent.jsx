import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import TopMessage from 'components/common/layout/TopMessage';
import {
  remainingDays,
  getShortDate,
  getTime,
  getTimeOfDay,
} from 'utils/date-helpers';
import Image from 'components/common/utils/Image';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { Link, navigate } from '@reach/router';
import { listJsonItems, moneyFormatInNaira } from 'utils/helpers';
import { getRequestStatusIcon } from 'utils/helpers';
import {
  eventHasExpired,
  defaultEvent,
  defaultEventEntertainer,
} from 'utils/event-helpers';
import AlertMessage from 'components/common/utils/AlertMessage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { HIRE_ENTERTAINERS_TYPE } from 'utils/constants';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import DuvLiveModal from 'components/custom/Modal';

const SingleUnresolvedEvent = ({ id }) => {
  const [message, setMessage] = React.useState({ msg: null, type: null });
  const [event, setEvent] = React.useState({
    eventEntertainer: { event: {} },
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/cancel-evententertainer/${id}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setEvent(data.event);
            setLoading(false);
          } else {
            setLoading(false);
            navigate('/admin/dashboard');
          }
        })
        .catch(function (error) {
          setLoading(false);
          navigate('/admin/dashboard');
        });
  }, [id]);

  const eventDetails = event.eventEntertainer.event;
  const owner = event.eventEntertainer.event.owner;

  return (
    <BackEndPage title="View Event">
      <div className="main-app">
        <TopMessage />

        <section className="app-content">
          {/* Event Name and Event Status */}
          <section className="row">
            <div className="col-sm-12">
              <h3 className="main-app__title">
                {eventDetails.eventType} <br />{' '}
                <small className="small--2 text-muted">
                  Cancelled By: {event.cancelledBy} on{' '}
                  {getShortDate(event.createdAt)} ({event.hoursDiff} hours
                  before event)
                </small>
              </h3>
            </div>
          </section>

          <div className="mt-4">
            {message.msg ? (
              <AlertMessage message={message.msg} type={message.type} />
            ) : (
              <AlertMessage
                message={
                  event.resolved
                    ? `Event has been resolved on ${getShortDate(
                        event.updatedAt
                      )}`
                    : `Pending Refund to resolve event -
                ${!event.eventOwnerRefunded ? 'Event Owner' : ''}
                ${
                  !event.eventOwnerRefunded &&
                  parseInt(event.payEntertainerDiscount, 10) > 0 &&
                  !event.entertainerPaid
                    ? ', '
                    : ''
                }
                ${
                  parseInt(event.payEntertainerDiscount, 10) > 0 &&
                  !event.entertainerPaid
                    ? 'Entertainer'
                    : ''
                }`
                }
                type={event.resolved ? 'success' : 'warning'}
              />
            )}
          </div>

          {loading ? (
            <LoadingScreen loading={loading} text="Loading Event Details" />
          ) : (
            <>
              {/* Event Details and Entertainers */}
              <aside className="row">
                <div className="col-md-8 mt-3">
                  {event.id && (
                    <EventOwnerCard
                      event={event}
                      owner={owner}
                      setEvent={setEvent}
                      setMessage={setMessage}
                    />
                  )}
                  {event.id &&
                  parseInt(event.payEntertainerDiscount, 10) > 0 ? (
                    <EventEntertainerCard
                      event={event}
                      setEvent={setEvent}
                      setMessage={setMessage}
                    />
                  ) : (
                    <SingleUnresolvedEventEntertainersTable event={event} />
                  )}
                </div>
                <div className="col-md-4">
                  <SingleUnresolvedEvent.EventDetailsCard
                    event={eventDetails}
                  />
                </div>
              </aside>
            </>
          )}
        </section>
      </div>
    </BackEndPage>
  );
};

SingleUnresolvedEvent.propTypes = {
  id: PropTypes.string,
};

SingleUnresolvedEvent.defaultProps = {
  id: null,
};

const EventOwnerCard = ({ event, owner, setMessage, setEvent }) => {
  const refundUserNow = () => {
    axios
      .get(`/api/v1/cancel-evententertainer/resolve/owner/${event.id}`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status } = response;
        // handle success
        if (status === 200) {
          setEvent({
            ...event,
            eventOwnerRefunded: true,
            refundEventOwnerDate: Date.now(),
            resolved:
              parseInt(event.payEntertainerDiscount, 10) === 0 ||
              !!event.entertainerPaid,
          });
          setMessage({
            msg: 'User refund has been succesfully resolved',
            type: 'success',
          });
        } else {
          setMessage({ msg: response.data.message });
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setMessage({ msg: error.response.data.message });
      });
  };

  const refundUserModalText = () => (
    <>
      <div className="text-center">
        <Image
          className="avatar--large"
          name={owner.firstName}
          responsiveImage={false}
          src={(owner && owner.profileImageURL) || ProfileAvatar}
        />
        <h4 className="font-weight-normal mt-3">
          {owner.firstName} {owner.lastName}
        </h4>
        <h5 className="text-yellow mt-3 mb-4">
          {moneyFormatInNaira(event.refundEventOwner)}
        </h5>
      </div>
      <div className="small--2">
        <h6 className="text-white">Note</h6>
        Confirming this will <strong>notify</strong> the user that they have
        been refunded their outstanding payment of{' '}
        <strong className="text-yellow">
          {moneyFormatInNaira(event.refundEventOwner)}
        </strong>{' '}
        . Kindly ensure that this has been paid to their account before clicking
        on the CONFIRM button.
      </div>
    </>
  );

  return (
    <>
      <h5 className="text-yellow">Owner Details</h5>
      <ul className={classNames('list-group')}>
        <li className="list-group-item text-center">
          <Image
            className="avatar--large"
            name={owner.firstName}
            responsiveImage={false}
            src={(owner && owner.profileImageURL) || ProfileAvatar}
          />
        </li>
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-events"></i>
            Event Owner
          </small>
          <h5 className="event-list-label">
            {owner.firstName} {owner.lastName}
            <br />
            <small className="small--2 text-muted">{owner.email}</small>
          </h5>{' '}
        </li>
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-events"></i>
            Phone
          </small>
          <h5 className="event-list-label">
            {owner.phoneNumber} <br />
            {owner.phoneNumber2}
          </h5>
        </li>
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-events"></i>
            Bank Details
          </small>
          <h5 className="event-list-label">
            {owner.bankName} - {owner.accountNumber} <br />
            <small className="small--2 text-muted">{owner.accountName}</small>
          </h5>
        </li>

        {event.eventOwnerRefunded ? (
          <li className="list-group-item">
            <h5 className="event-list-label">
              <span className="text-green">
                User has been refunded{' '}
                {moneyFormatInNaira(event.refundEventOwner)} <br />
                <small className="small--2 text-muted-light">
                  Date Paid - {getShortDate(event.refundEventOwnerDate)}
                </small>
              </span>
            </h5>
          </li>
        ) : (
          <li className="list-group-item">
            <small className="small-text__with-icon">
              <i className="icon icon-events"></i>
              Amount to Refund
            </small>
            <h5 className="event-list-label">
              {moneyFormatInNaira(event.refundEventOwner)} <br />
              <small className="small--2 text-muted">
                Amount User Paid - {moneyFormatInNaira(event.amount)}
              </small>
            </h5>

            <DuvLiveModal
              actionFn={() => refundUserNow()}
              actionText="Confirm Refund"
              body={refundUserModalText()}
              closeModalText="Cancel"
              title="Refund Event Owner"
            >
              <button
                className="btn btn-danger btn-transparent"
                to={`/admin/unresolved-event/${event.id}`}
              >
                Mark as Resolved
              </button>
            </DuvLiveModal>
          </li>
        )}
      </ul>
    </>
  );
};

EventOwnerCard.propTypes = {
  event: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const EventEntertainerCard = ({ event, setMessage, setEvent }) => {
  const entertainer = event.eventApplication.user;

  const refundEntertainerNow = () => {
    axios
      .get(`/api/v1/cancel-evententertainer/resolve/entertainer/${event.id}`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status } = response;
        // handle success
        if (status === 200) {
          setEvent({
            ...event,
            entertainerPaid: true,
            paidEntertainerOn: Date.now(),
            resolved: !!event.eventOwnerRefunded,
          });
          setMessage({
            msg: 'Entertainer Payment has been successfully resolved',
            type: 'success',
          });
        } else {
          setMessage({ message: response.data.message });
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setMessage({ msg: error.response.data.message });
      });
  };

  const refundEntertainerModalText = () => (
    <>
      <div className="text-center">
        <Image
          className="avatar--large"
          name={entertainer.profile.stageName}
          responsiveImage={false}
          src={entertainer.profileImageURL || ProfileAvatar}
        />
        <h4 className="font-weight-normal mt-3">
          {entertainer.profile.stageName}
        </h4>
        <h5 className="text-yellow mt-3 mb-4">
          {moneyFormatInNaira(event.payEntertainerDiscount)}
        </h5>
      </div>
      <div className="small--2">
        <h6 className="text-white">Note</h6>
        Confirming this will <strong>notify</strong> the entertainer that they
        have been been paid their discount payment of{' '}
        <strong className="text-yellow">
          &#8358; {moneyFormatInNaira(event.payEntertainerDiscount)}
        </strong>{' '}
        . Kindly ensure that this has been paid to their account before clicking
        on the CONFIRM button.
      </div>
    </>
  );

  return (
    <>
      <h5 className="text-red mt-5">Entertainer Details</h5>
      <ul className={classNames('list-group transparent')}>
        <li className="list-group-item text-center">
          <Image
            className="avatar--large"
            name={
              (entertainer.profile && entertainer.profile.stageName) ||
              'No name'
            }
            responsiveImage={false}
            src={(entertainer && entertainer.profileImageURL) || ProfileAvatar}
          />
          <h5 className="event-list-label">
            {entertainer.profile.stageName}
            <br />
            <small className="small--2 text-muted">
              {entertainer.profile.entertainerType}
            </small>
          </h5>{' '}
        </li>
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-events"></i>
            Phone
          </small>
          <h5 className="event-list-label">
            {entertainer.phoneNumber} <br />
            {entertainer.phoneNumber2}
          </h5>
        </li>
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-events"></i>
            Bank Details
          </small>
          <h5 className="event-list-label">
            {entertainer.bankDetail.bankName} -{' '}
            {entertainer.bankDetail.accountNumber} <br />
            <small className="small--2 text-muted">
              {entertainer.bankDetail.accountName}
            </small>
          </h5>
        </li>

        {event.entertainerPaid ? (
          <li className="list-group-item">
            <h5 className="event-list-label">
              <span className="text-green">
                Entertainer has been paid a discount of{' '}
                {moneyFormatInNaira(event.payEntertainerDiscount)} <br />
                <small className="small--2 text-muted-light">
                  Date Paid - {getShortDate(event.paidEntertainerOn)}
                </small>
              </span>
            </h5>
          </li>
        ) : (
          <li className="list-group-item">
            <small className="small-text__with-icon">
              <i className="icon icon-events"></i>
              Amount to Refund
            </small>
            <h5 className="event-list-label">
              {moneyFormatInNaira(event.payEntertainerDiscount)} <br />
              <small className="small--2 text-muted">
                Proposed Payment -{' '}
                {moneyFormatInNaira(
                  event.eventApplication.proposedPrice ||
                    event.eventApplication.askingPrice
                )}
              </small>
            </h5>

            <DuvLiveModal
              actionFn={() => refundEntertainerNow()}
              actionText="Confirm Refund"
              body={refundEntertainerModalText()}
              closeModalText="Cancel"
              title="Refund Event Owner"
            >
              <button
                className="btn btn-danger btn-transparent"
                to={`/admin/unresolved-event/${event.id}`}
              >
                Mark as Resolved
              </button>
            </DuvLiveModal>
          </li>
        )}
      </ul>
    </>
  );
};

EventEntertainerCard.propTypes = {
  event: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

SingleUnresolvedEvent.EventTitle = ({ event }) => {
  const sanitizedEvent = { ...defaultEvent, ...event };

  return (
    <h3 className="main-app__title">
      {sanitizedEvent.eventType} <br />{' '}
      <small className="main-app__small remaining-time">
        <i className="icon icon-hourglass"></i>
        {remainingDays(sanitizedEvent.eventDate)}
      </small>
    </h3>
  );
};

SingleUnresolvedEvent.EventTitle.propTypes = {
  event: PropTypes.shape({
    eventDate: PropTypes.string,
    eventType: PropTypes.string,
  }),
};

SingleUnresolvedEvent.EventTitle.propTypes = {
  event: {},
};

SingleUnresolvedEvent.EventDetailsCard = ({
  event,
  showAddress,
  transparent,
}) => {
  const sanitizedEvent = { ...defaultEvent, ...event };
  console.log('sanitizedEvent', sanitizedEvent);
  return (
    <ul className={classNames('list-group', { transparent })}>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-events"></i>
          Date
        </small>
        <h5 className="event-list-label">
          {getShortDate(sanitizedEvent.eventDate)}
        </h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-clock"></i>
          Start Time
        </small>
        <h5 className="event-list-label">
          {getTime(sanitizedEvent.startTime)} (
          {getTimeOfDay(sanitizedEvent.startTime)})
        </h5>
      </li>
      {eventHasExpired(sanitizedEvent.eventDate) && (
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-clock"></i>
            Time to Event
          </small>
          <h5 className="event-list-label">
            {remainingDays(sanitizedEvent.eventDate)}
          </h5>
        </li>
      )}
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-clock"></i>
          Duration
        </small>
        <h5 className="event-list-label">{sanitizedEvent.eventDuration}</h5>
      </li>

      {showAddress && (
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-location"></i>
            Address
          </small>
          <h5 className="event-list-label">
            <address className="">
              {sanitizedEvent.streetLine1} <br />
              {sanitizedEvent.streetLine2 && sanitizedEvent.streetLine2 + ', '}
              {sanitizedEvent.lga}{' '}
              {sanitizedEvent.landmark && sanitizedEvent.landmark + ', '}{' '}
              {sanitizedEvent.location}
            </address>
          </h5>
        </li>
      )}
    </ul>
  );
};

SingleUnresolvedEvent.EventDetailsCard.propTypes = {
  event: PropTypes.shape({
    eventDate: PropTypes.string,
    eventType: PropTypes.string,
    startTime: PropTypes.string,
    eventDuration: PropTypes.string,
    streetLine1: PropTypes.string,
    streetLine2: PropTypes.string,
    lga: PropTypes.string,
    landmark: PropTypes.string,
    location: PropTypes.string,
  }),
  showAddress: PropTypes.bool,
  transparent: PropTypes.bool,
};

SingleUnresolvedEvent.EventDetailsCard.defaultProps = {
  event: {},
  showAddress: true,
  transparent: false,
};

SingleUnresolvedEvent.EventEntertainerDetailsCard = ({ eventEntertainer }) => {
  const sanitizedEntertainer = {
    ...defaultEventEntertainer,
    ...eventEntertainer,
  };

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-events"></i>
          Entertainer Type
        </small>
        <h5 className="event-list-label">
          {sanitizedEntertainer.entertainerType}
        </h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-clock"></i>
          Place of Event
        </small>
        <h5 className="event-list-label">
          {sanitizedEntertainer.placeOfEvent}
        </h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-events"></i>
          Expected Audience Size
        </small>
        <h5 className="event-list-label">
          {sanitizedEntertainer.expectedAudienceSize}
        </h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-clock"></i>
          Age Group
        </small>
        <h5 className="event-list-label">
          {listJsonItems(sanitizedEntertainer.ageGroup)}
        </h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-clock"></i>
          Genre
        </small>
        <h5 className="event-list-label">
          {listJsonItems(sanitizedEntertainer.genre, 'Any')}
        </h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-clock"></i>
          Language
        </small>
        <h5 className="event-list-label">
          {listJsonItems(sanitizedEntertainer.language, 'Any')}
        </h5>
      </li>
    </ul>
  );
};

SingleUnresolvedEvent.EventEntertainerDetailsCard.propTypes = {
  eventEntertainer: PropTypes.object.isRequired,
};

const SingleUnresolvedEventEntertainersTable = ({ event }) => {
  const eventDetails = event.eventEntertainer.event;

  if (!event.eventApplication) {
    return null;
  }

  // show entertainer details
  const entertainer = {
    ...event.eventApplication?.user,
    ...event.eventApplication?.user?.profile,
  };

  return (
    <>
      <h6 className="text-red text-weight-normal mt-5">
        Entertainer Details (No refund)
      </h6>
      <div className="table-responsive">
        <table className="table table-dark  table__no-border table__with-bg">
          <thead>
            <tr className="transparent">
              <td colSpan="5">
                {eventDetails.cancelled && (
                  <SingleUnresolvedEvent.CancelledEvent event={eventDetails} />
                )}
              </td>
            </tr>
          </thead>
          <tbody>
            <SingleUnresolvedEvent.HireEntertainersRow
              entertainer={entertainer}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};

SingleUnresolvedEventEntertainersTable.propTypes = {
  event: PropTypes.object,
};

SingleUnresolvedEventEntertainersTable.defaultProps = {
  event: {},
};

SingleUnresolvedEvent.NoHiredEntertainer = () => (
  <h4 className="main-app__title text-muted pb-4 text-center">
    <span className="icon icon-help no-entertainer-icon"></span>
    <br />
    No hired Entertainer
  </h4>
);

SingleUnresolvedEvent.CancelledEvent = ({ event }) => (
  <>
    <h4 className="main-app__title text-white pb-4 text-center">
      <span className="icon icon-cancel-circled text-red no-entertainer-icon"></span>
      <br />
      <span className="text-muted-light mb-1">Event was cancelled on</span>
      {getShortDate(event.cancelledDate)}
    </h4>
    <hr />
    <h5 className="font-weight-normal mt-5">Reason</h5>
    <p className="">{event.cancelledReason}</p>
  </>
);

SingleUnresolvedEvent.CancelledEvent.propTypes = {
  event: PropTypes.object,
};

SingleUnresolvedEvent.CancelledEvent.propTypes = {
  event: {},
};

SingleUnresolvedEvent.HireEntertainersRow = ({ entertainer }) => {
  if (!entertainer) {
    return null;
  }

  return (
    <tr>
      <td className="align-middle">
        {entertainer && (
          <Image
            className="avatar--medium"
            name={(entertainer && entertainer.stageName) || 'No name'}
            responsiveImage={false}
            src={(entertainer && entertainer.profileImageURL) || ProfileAvatar}
          />
        )}
      </td>
      <td className="align-middle">
        <span className="text-muted small--4">Stage Name</span>{' '}
        <span className="text-white">
          {entertainer && entertainer.stageName}
        </span>
      </td>
      <td className="align-middle text-yellow">
        <span className="text-muted small--4">Type</span>{' '}
        <span className="text-white">
          {entertainer && entertainer.entertainerType}
        </span>
      </td>
      <td className="align-middle text-yellow">
        <span className="text-muted small--4">Location</span>
        <span className="text-white">
          {entertainer && entertainer.location}
        </span>
      </td>
      <td className="align-middle text-yellow">
        <span className="text-muted small--4">Discount</span>
        <span className="text-green">None</span>
      </td>
    </tr>
  );
};

SingleUnresolvedEvent.HireEntertainersRow.propTypes = {
  entertainer: PropTypes.object,
};
SingleUnresolvedEvent.HireEntertainersRow.defaultProps = {
  entertainer: {},
};

SingleUnresolvedEvent.PendingEntertainersRow = ({ eventEntertainer }) => {
  if (!eventEntertainer) {
    return null;
  }

  let entertainerEventUrl;

  const isAuction =
    eventEntertainer.hireType === HIRE_ENTERTAINERS_TYPE.auction.title;

  const hasApplication =
    eventEntertainer.applications &&
    eventEntertainer.applications[0] &&
    eventEntertainer.applications[0].id;

  if (isAuction) {
    entertainerEventUrl = `/admin/auction/bids/${eventEntertainer.id}`;
  } else {
    entertainerEventUrl = hasApplication
      ? `/admin/request/view/${eventEntertainer.applications[0].id}`
      : `/admin/dashboard`;
  }

  return (
    <tr>
      <td className="align-middle">
        <span className="text-muted small--4">Type</span>{' '}
        <span className="text-white">{eventEntertainer.entertainerType}</span>
      </td>
      <td className="align-middle">
        <span className="text-muted small--4">Hire Type</span>{' '}
        <span className="text-muted-light-2"> {eventEntertainer.hireType}</span>
      </td>
      <td className="align-middle">
        <span className="text-muted small--4">Place of Event</span>{' '}
        <span className="text-muted-light">
          {' '}
          {eventEntertainer.placeOfEvent}
        </span>
      </td>
      <td className="align-middle">
        <span className="text-muted small--4">Status</span>{' '}
        <span>
          {hasApplication
            ? getRequestStatusIcon(eventEntertainer.applications[0].status)
            : getRequestStatusIcon('Pending')}
        </span>
      </td>
      <td className="align-middle text-right td-btn">
        <Link
          className="btn btn-info btn-sm btn-transparent"
          to={entertainerEventUrl}
        >
          View Details
        </Link>
      </td>
    </tr>
  );
};
SingleUnresolvedEvent.PendingEntertainersRow.propTypes = {
  eventEntertainer: PropTypes.object,
};
SingleUnresolvedEvent.PendingEntertainersRow.defaultProps = {
  eventEntertainer: {},
};

export default SingleUnresolvedEvent;
