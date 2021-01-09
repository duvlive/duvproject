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
import { Link, navigate } from '@reach/router';
import { listJsonItems, getBudgetRange } from 'utils/helpers';
import { getRequestStatusIcon } from 'utils/helpers';
import {
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
import DuvLiveModal from 'components/custom/Modal';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import { cancelEventSchema } from 'components/forms/schema/eventSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import TextArea from 'components/forms/TextArea';
import ProfileAvatar from 'assets/img/avatar/profile.png';

const SingleEvent = ({ id }) => {
  const [message, setMessage] = React.useState({ msg: null, type: null });
  const [event, setEvent] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { userState, userDispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/admin/event/${id}`, {
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
  console.log('event', event);

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

                  <SingleEventEntertainersTable event={event} />
                </div>
                <div className="col-md-4">
                  <SingleEvent.EventDetailsCard event={event} />
                  {!eventHasExpired(event.eventDate) && (
                    <SingleEvent.CancelEvent event={event} />
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

SingleEvent.propTypes = {
  id: PropTypes.string,
};

SingleEvent.defaultProps = {
  id: null,
};

SingleEvent.EventTitle = ({ event }) => {
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

SingleEvent.EventTitle.propTypes = {
  event: PropTypes.shape({
    eventDate: PropTypes.string,
    eventType: PropTypes.string,
  }),
};

SingleEvent.EventTitle.propTypes = {
  event: {},
};

SingleEvent.EventDetailsCard = ({ event, showAddress, transparent }) => {
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

SingleEvent.EventDetailsCard.propTypes = {
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

SingleEvent.EventDetailsCard.defaultProps = {
  event: {},
  showAddress: true,
  transparent: false,
};

SingleEvent.EventEntertainerDetailsCard = ({ eventEntertainer }) => {
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

SingleEvent.EventEntertainerDetailsCard.propTypes = {
  eventEntertainer: PropTypes.object.isRequired,
};

const SingleEventEntertainersTable = ({ event }) => {
  const eventEntertainers = event.entertainers || [];
  const eventDate = event.eventDate;

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
              {event.cancelled ? (
                <SingleEvent.CancelledEvent event={event} />
              ) : hiredEntertainers.length > 0 ? (
                <h3 className="event-title text-blue">Hired Entertainers</h3>
              ) : (
                <SingleEvent.NoHiredEntertainer />
              )}
            </td>
          </tr>
        </thead>
        {!event.cancelled && (
          <tbody>
            {hiredEntertainers.map(({ entertainer }, index) => (
              <SingleEvent.HireEntertainersRow
                entertainer={entertainer}
                key={index}
              />
            ))}
          </tbody>
        )}
      </table>

      {!event.cancelled &&
        !eventHasExpired(eventDate) &&
        pendingEntertainers.length > 0 && (
          <>
            <hr className="mt-6 mb-4" />

            <table className="table table-dark  table__no-border table__with-bg">
              <thead>
                <tr className="transparent">
                  <td colSpan="5">
                    <h3 className="main-app__subtitle font-weight-normal text-muted-light ml-md-n3">
                      Entertainer Requests (In View)
                    </h3>
                  </td>
                </tr>
              </thead>

              <tbody>
                {pendingEntertainers.map((event, index) => (
                  <SingleEvent.PendingEntertainersRow
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
    <SingleEvent.NoHiredEntertainer />
  );
};

SingleEventEntertainersTable.propTypes = {
  event: PropTypes.object,
};

SingleEventEntertainersTable.defaultProps = {
  event: {},
};

SingleEvent.NoHiredEntertainer = () => (
  <h4 className="main-app__title text-muted pb-4 text-center">
    <span className="icon icon-help no-entertainer-icon"></span>
    <br />
    No hired Entertainer
  </h4>
);

SingleEvent.CancelledEvent = ({ event }) => (
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

SingleEvent.CancelledEvent.propTypes = {
  event: PropTypes.object,
};

SingleEvent.CancelledEvent.propTypes = {
  event: {},
};

SingleEvent.HireEntertainersRow = ({ entertainer }) => {
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
              ProfileAvatar
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
            href={`/entertainers/profile/${entertainer.slug}`}
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
SingleEvent.HireEntertainersRow.propTypes = {
  entertainer: PropTypes.object,
};
SingleEvent.HireEntertainersRow.defaultProps = {
  entertainer: {},
};

SingleEvent.PendingEntertainersRow = ({ eventEntertainer }) => {
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
SingleEvent.PendingEntertainersRow.propTypes = {
  eventEntertainer: PropTypes.object,
};
SingleEvent.PendingEntertainersRow.defaultProps = {
  eventEntertainer: {},
};

SingleEvent.CancelEvent = ({ event }) => {
  const hiredEntertainers = event.entertainers.filter(
    (eventEntertainer) => !!eventEntertainer.entertainer
  );

  return (
    <>
      {hiredEntertainers.length > 0 ? (
        <div className="text-right cancel-event__text mt-3 mb-5">
          <DuvLiveModal
            body={<CancelEventForm eventId={event.id} />}
            closeModalText="Cancel"
            title="Cancel Event"
          >
            <>
              <i className="icon icon-cancel"></i> Cancel Event
            </>
          </DuvLiveModal>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

SingleEvent.CancelEvent.propTypes = {
  event: PropTypes.object,
};

SingleEvent.CancelEvent.defaultProps = {
  event: { entertainer: {} },
};

const CancelEventForm = ({ eventId }) => {
  const [message, setMessage] = React.useState({});
  let { userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      initialValues={setInitialValues(cancelEventSchema)}
      onSubmit={(values, actions) => {
        axios
          .post(`/api/v1/event/cancel/${eventId}`, values, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            console.log('data', data);
            if (status === 200) {
              userDispatch({
                type: 'cancel-event',
                event: {
                  ...data.event,
                  cancelled: true,
                  cancelledDate: Date.now(),
                },
                alert: 'cancel-event-success',
              });
              navigate('/admin/events');
              actions.resetForm();
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            console.log('error ', error.response.data.message);
            setMessage({ msg: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <>
          <Form>
            <AlertMessage
              message={message && message.msg}
              type={message && message.type}
            />

            <TextArea
              label="Reason"
              name="cancelledReason"
              placeholder="Enter the reason for cancelling the event"
              rows="3"
            />
            <div className="small--2 mt-n3 mb-3 text-muted-light">
              Late Cancellations (i.e cancellations done less than 48hrs to
              event date) attract a{' '}
              <strong className="text-info">penalty</strong> in the form of a
              compensation charge which is 35% of the Principal Amount Paid, and
              is Payable to the Entertainer hired. Refunds will be made only to
              a bank account with details matching the personal profile of the
              User. Do you wish to proceed with the cancellation of Corporate
              Event?
            </div>
            <Button
              className="btn-info btn-wide btn-transparent mt-2"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Yes, Cancel Event
            </Button>
          </Form>
        </>
      )}
      validationSchema={createSchema(cancelEventSchema)}
    />
  );
};

CancelEventForm.propTypes = {
  eventId: PropTypes.any.isRequired,
};

export default SingleEvent;
