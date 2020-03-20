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
  getNumberOfDaysToEvent
} from 'utils/date-helpers';
import Image from 'components/common/utils/Image';
import DuvLiveModal from 'components/custom/Modal';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { Link } from '@reach/router';
import { listJsonItems, getBudgetRange } from 'utils/helpers';
import {
  userCanAddEntertainer,
  eventIsVoid,
  eventHasExpired
} from 'utils/event-helpers';
import AlertMessage from 'components/common/utils/AlertMessage';

const defaultEvent = {
  userId: 0,
  eventType: null,
  eventDate: Date.now(),
  startTime: Date.now(),
  eventDuration: null,
  moreInformation: null,
  streetLine1: null,
  streetLine2: null,
  state: null,
  lga: null,
  city: null,
  landmark: null,
  description: null
};

const defaultEventEntertainer = {
  entertainerType: null,
  placeOfEvent: null,
  genre: null,
  language: null,
  expectedAudienceSize: null,
  ageGroup: null,
  lowestBudget: null,
  highestBudget: null,
  specialRequest: null,
  auctionStartDate: null,
  auctionEndDate: null,
  hireType: 'Auction',
  hiredDate: null,
  hiredEntertainer: null
};

const ViewEvent = ({ id }) => {
  const [event, setEvent] = React.useState({});
  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/events/${id}`, {
          headers: {
            'x-access-token': getTokenFromStore()
          }
        })
        .then(function(response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setEvent(data.event);
          }
        })
        .catch(function(error) {
          // console.log(error.response.data.message);
          // navigate to all events
        });
  }, [id]);

  return (
    <BackEndPage title="View Event">
      <div className="main-app">
        <TopMessage />

        <section className="app-content">
          {/* Event Name and Event Status */}
          <section className="row">
            <div className="col-sm-12">
              <h3 className="main-app__title">
                {event.eventType} <br />{' '}
                <small className="main-app__small remaining-time">
                  <i className="icon icon-hourglass"></i>
                  {!eventHasExpired(event.eventDate) && (
                    <>{remainingDays(event.eventDate)}</>
                  )}
                </small>
              </h3>
            </div>
          </section>
          {/* Event Details and Entertainers */}
          <aside className="row">
            <div className="col-md-8">
              {eventHasExpired(event.eventDate) && (
                <AlertMessage message="Event Date has passed" type="error" />
              )}
              {!eventHasExpired(event.eventDate) &&
                eventIsVoid(event.eventDate) && (
                  <AlertMessage
                    message="Event can no longer be edited."
                    type="info"
                  />
                )}

              <ViewEvent.EntertainersTable
                eventEntertainers={event.entertainers || []}
              />
              {userCanAddEntertainer() && (
                <Link
                  className="btn btn-danger btn-transparent"
                  to={`/user/events/${id}/add-entertainer/Auction`}
                >
                  Add Entertainer
                </Link>
              )}
            </div>
            <div className="col-md-4">
              <ViewEvent.EventDetailsCard event={event} />
              {!eventHasExpired(event.eventDate) && (
                <div className="text-right cancel-event__text mt-3 mb-5">
                  <i className="icon icon-cancel"></i> Cancel Event
                </div>
              )}
            </div>
          </aside>
        </section>
      </div>
    </BackEndPage>
  );
};

ViewEvent.propTypes = {
  id: PropTypes.string
};

ViewEvent.defaultProps = {
  id: null
};

ViewEvent.EventTitle = ({ event }) => {
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

ViewEvent.EventTitle.propTypes = {
  event: PropTypes.shape({
    eventDate: PropTypes.string,
    eventType: PropTypes.string
  })
};

ViewEvent.EventTitle.propTypes = {
  event: {}
};

ViewEvent.EventDetailsCard = ({ event, showAddress, transparent }) => {
  const sanitizedEvent = { ...defaultEvent, ...event };
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
      {/* <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-dot-circled"></i>
          Event Status
        </small>
        <h5 className="event-list-label">Random Status</h5>
      </li> */}
    </ul>
  );
};

ViewEvent.EventDetailsCard.propTypes = {
  event: PropTypes.shape({
    eventDate: PropTypes.string,
    eventType: PropTypes.string,
    startTime: PropTypes.string,
    eventDuration: PropTypes.string,
    streetLine1: PropTypes.string,
    streetLine2: PropTypes.string,
    lga: PropTypes.string,
    landmark: PropTypes.string,
    location: PropTypes.string
  }),
  showAddress: PropTypes.bool,
  transparent: PropTypes.bool
};

ViewEvent.EventDetailsCard.defaultProps = {
  event: {},
  showAddress: true,
  transparent: false
};

ViewEvent.EventEntertainerDetailsCard = ({ eventEntertainer }) => {
  const sanitizedEntertainer = {
    ...defaultEventEntertainer,
    ...eventEntertainer
  };
  const isAuction = sanitizedEntertainer.hireType === 'Auction';

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-events"></i>
          Budget
        </small>
        <h5 className="event-list-label">
          {getBudgetRange(
            sanitizedEntertainer.lowestBudget,
            sanitizedEntertainer.highestBudget
          )}
        </h5>
      </li>
      {isAuction && (
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-events"></i>
            Auction Closes
          </small>
          <h5 className="event-list-label">
            {getNumberOfDaysToEvent(sanitizedEntertainer.auctionEndDate)}
          </h5>
        </li>
      )}
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

ViewEvent.EventEntertainerDetailsCard.propTypes = {
  eventEntertainer: PropTypes.object.isRequired
};

ViewEvent.EntertainersTable = ({ eventEntertainers }) => {
  const hiredEntertainers = eventEntertainers.filter(
    eventEntertainer => !!eventEntertainer.entertainer
  );
  const pendingEntertainers = eventEntertainers.filter(
    eventEntertainer => !eventEntertainer.entertainer
  );

  return eventEntertainers.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-dark  table__no-border table__with-bg">
        <thead>
          <tr className="transparent">
            <td colSpan="5">
              <h3 className="event-title text-blue">
                {hiredEntertainers.length > 0
                  ? 'Hired Entertainers'
                  : 'You have not hired any Entertainer'}
              </h3>
            </td>
          </tr>
        </thead>

        <tbody>
          {hiredEntertainers.map((event, index) => (
            <ViewEvent.HireEntertainersRow
              entertainer={event.entertainer}
              key={index}
            />
          ))}
        </tbody>
      </table>

      {pendingEntertainers.length > 0 && (
        <>
          <hr className="mt-6 mb-4" />

          <table className="table table-dark  table__no-border table__with-bg">
            <thead>
              <tr className="transparent">
                <td colSpan="5">
                  <h3 className="event-title text-blue">
                    Entertainers (In Review)
                  </h3>
                </td>
              </tr>
            </thead>

            <tbody>
              {pendingEntertainers.map((event, index) => (
                <ViewEvent.PendingEntertainersRow
                  eventEntertainer={event}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  ) : (
    <h3 className="text-white event-title ml-0 mt-5">
      You have no Entertainer in Review
    </h3>
  );
};

ViewEvent.EntertainersTable.propTypes = {
  eventEntertainers: PropTypes.array.isRequired
};

ViewEvent.HireEntertainersRow = ({ entertainer }) => {
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
            src={
              (entertainer &&
                entertainer.personalDetails &&
                entertainer.personalDetails.profileImageURL) ||
              'No src'
            }
          />
        )}
      </td>
      <td className="align-middle text-right">
        {entertainer && entertainer.stageName}
      </td>
      <td className="align-middle text-yellow">
        {entertainer && entertainer.entertainerType}
      </td>
      <td className="align-middle text-right td-btn">
        <button className="btn btn-danger btn-sm btn-transparent">
          Pay Now
        </button>
      </td>
      <td className="align-middle text-right td-btn">
        {entertainer && (
          <DuvLiveModal.ViewEntertainerProfile entertainer={entertainer} />
        )}
      </td>
    </tr>
  );
};
ViewEvent.HireEntertainersRow.propTypes = {
  entertainer: PropTypes.object
};
ViewEvent.HireEntertainersRow.defaultProps = {
  entertainer: {}
};

ViewEvent.PendingEntertainersRow = ({ eventEntertainer }) => {
  if (!eventEntertainer) {
    return null;
  }

  return (
    <tr>
      <td className="align-middle">
        <span className="text-muted small--4">Type</span>{' '}
        <span className="text-yellow"> {eventEntertainer.entertainerType}</span>
      </td>
      <td className="align-middle">
        <span className="text-muted small--4">Hire Type</span>{' '}
        <span className="text-yellow"> {eventEntertainer.hireType}</span>
      </td>
      <td className="align-middle">
        <span className="text-muted small--4">Place of Event</span>{' '}
        <span className="text-yellow"> {eventEntertainer.placeOfEvent}</span>
      </td>
      <td className="align-middle">
        <span className="text-muted small--4">Audience Size</span>{' '}
        <span className="text-yellow">
          {eventEntertainer.expectedAudienceSize}
        </span>
      </td>
      <td className="align-middle text-right td-btn">
        <button className="btn btn-info btn-sm btn-transparent">
          View Details
        </button>
      </td>
    </tr>
  );
};
ViewEvent.PendingEntertainersRow.propTypes = {
  eventEntertainer: PropTypes.object
};
ViewEvent.PendingEntertainersRow.defaultProps = {
  eventEntertainer: {}
};

export default ViewEvent;
