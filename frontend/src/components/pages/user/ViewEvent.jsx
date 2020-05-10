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
  getNumberOfDaysToEvent,
} from 'utils/date-helpers';
import Image from 'components/common/utils/Image';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { Link, Match } from '@reach/router';
import { listJsonItems, getBudgetRange } from 'utils/helpers';
import { getRequestStatusIcon } from 'utils/helpers';
import {
  userCanAddEntertainer,
  eventIsVoid,
  eventHasExpired,
  defaultEvent,
  defaultEventEntertainer,
  eventIsOngoing,
} from 'utils/event-helpers';
import AlertMessage from 'components/common/utils/AlertMessage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { HIRE_ENTERTAINERS_TYPE } from 'utils/constants';
import { UserContext } from 'context/UserContext';

const ViewEvent = ({ id }) => {
  const [message, setMessage] = React.useState({ msg: null, type: null });
  const [event, setEvent] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { userState, userDispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/events/${id}`, {
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
          }
        })
        .catch(function (error) {
          setLoading(false);
        });
  }, [id]);

  if (userState && userState.alert === 'add-entertainer-details-success') {
    !message.msg &&
      setMessage({
        msg: 'Your entertainer details has been successfully added to event',
        type: 'success',
      });
    userDispatch({
      type: 'remove-alert',
    });
  }

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
                {!eventHasExpired(event.eventDate) && (
                  <small className="main-app__small remaining-time">
                    <i className="icon icon-hourglass"></i>
                    <>{remainingDays(event.eventDate)}</>
                  </small>
                )}
              </h3>
            </div>
          </section>

          <Match path={`/user/events/view/${id}/success`}>
            {(props) =>
              // eslint-disable-next-line react/prop-types
              props.match && (
                <div className="mt-3 mb-4">
                  <AlertMessage
                    message="Your Auction has been successfully approved"
                    type="success"
                  />
                </div>
              )
            }
          </Match>

          <div className="mt-4">
            <AlertMessage message={message.msg} type={message.type} />
          </div>

          {loading ? (
            <LoadingScreen loading={loading} text="Loading Event Details" />
          ) : (
            <>
              {/* Event Details and Entertainers */}
              <aside className="row">
                <div className="col-md-8 mt-3">
                  {eventIsOngoing(event.eventDate, event.eventDuration) && (
                    <AlertMessage
                      message="Event is currently ongoing."
                      type="info"
                    />
                  )}
                  {eventHasExpired(event.eventDate) &&
                    !eventIsOngoing(event.eventDate, event.eventDuration) && (
                      <AlertMessage
                        message="Event Date has passed"
                        type="error"
                      />
                    )}
                  {!eventHasExpired(event.eventDate) &&
                    eventIsVoid(event.eventDate) &&
                    !eventIsOngoing(event.eventDate, event.eventDuration) && (
                      <AlertMessage
                        message="Event can no longer be edited."
                        type="info"
                      />
                    )}

                  <ViewEvent.EntertainersTable
                    eventDate={event.eventDate || ''}
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
            </>
          )}
        </section>
      </div>
    </BackEndPage>
  );
};

ViewEvent.propTypes = {
  id: PropTypes.string,
};

ViewEvent.defaultProps = {
  id: null,
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
    eventType: PropTypes.string,
  }),
};

ViewEvent.EventTitle.propTypes = {
  event: {},
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
    location: PropTypes.string,
  }),
  showAddress: PropTypes.bool,
  transparent: PropTypes.bool,
};

ViewEvent.EventDetailsCard.defaultProps = {
  event: {},
  showAddress: true,
  transparent: false,
};

ViewEvent.EventEntertainerDetailsCard = ({ eventEntertainer }) => {
  const sanitizedEntertainer = {
    ...defaultEventEntertainer,
    ...eventEntertainer,
  };
  const isAuction = sanitizedEntertainer.hireType === 'Auction';

  return (
    <ul className="list-group">
      {/* Budget */}
      {sanitizedEntertainer.lowestBudget > 0 &&
        sanitizedEntertainer.highestBudget > 0 && (
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
        )}
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
  eventEntertainer: PropTypes.object.isRequired,
};

ViewEvent.EntertainersTable = ({ eventEntertainers, eventDate }) => {
  const hiredEntertainers = eventEntertainers.filter(
    (eventEntertainer) => !!eventEntertainer.entertainer
  );
  const pendingEntertainers = eventEntertainers.filter(
    (eventEntertainer) => !eventEntertainer.entertainer
  );

  return eventEntertainers.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-dark  table__no-border table__with-bg">
        <thead>
          <tr className="transparent">
            <td colSpan="5">
              {hiredEntertainers.length > 0 ? (
                <h3 className="event-title text-blue">Hired Entertainers</h3>
              ) : (
                <ViewEvent.NoHiredEntertainer />
              )}
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

      {!eventHasExpired(eventDate) && pendingEntertainers.length > 0 && (
        <>
          <hr className="mt-6 mb-4" />

          <table className="table table-dark  table__no-border table__with-bg">
            <thead>
              <tr className="transparent">
                <td colSpan="5">
                  <h3 className="main-app__subtitle font-weight-normal text-muted-light ml-n3">
                    Entertainer Requests (In View)
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
    <ViewEvent.NoHiredEntertainer />
  );
};

ViewEvent.EntertainersTable.propTypes = {
  eventDate: PropTypes.string.isRequired,
  eventEntertainers: PropTypes.array.isRequired,
};

ViewEvent.NoHiredEntertainer = () => (
  <h4 className="main-app__title text-muted pb-4 text-center">
    <span className="icon icon-help no-entertainer-icon"></span>
    <br />
    No hired Entertainer
  </h4>
);

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
        <span className="text-muted small--4">Status</span>
        <span className="text-green">
          <span className="icon icon-ok-circled"></span>
          PAID
        </span>
      </td>
      <td className="align-middle td-btn">
        {entertainer && (
          <a
            className="btn btn-info btn-sm btn-transparent"
            href={`/entertainers/${entertainer.slug}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            View Profile
          </a>
        )}
      </td>
    </tr>
  );
};
ViewEvent.HireEntertainersRow.propTypes = {
  entertainer: PropTypes.object,
};
ViewEvent.HireEntertainersRow.defaultProps = {
  entertainer: {},
};

ViewEvent.PendingEntertainersRow = ({ eventEntertainer }) => {
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
    entertainerEventUrl = `/user/auction/bids/${eventEntertainer.id}`;
  } else {
    entertainerEventUrl = hasApplication
      ? `/user/request/view/${eventEntertainer.applications[0].id}`
      : `/user/dashboard`;
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
        {/* TODO Add for other types e.g search and recommendation  */}
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
ViewEvent.PendingEntertainersRow.propTypes = {
  eventEntertainer: PropTypes.object,
};
ViewEvent.PendingEntertainersRow.defaultProps = {
  eventEntertainer: {},
};

export default ViewEvent;
