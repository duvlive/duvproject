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
import DuvLiveModal from 'components/custom/Modal';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { listJsonItems } from 'utils/helpers';
import {
  eventHasExpired,
  defaultEvent,
  defaultEventEntertainer,
  eventIsOngoing,
} from 'utils/event-helpers';
import { navigate } from '@reach/router';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import { cancelEventSchema } from 'components/forms/schema/eventSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import TextArea from 'components/forms/TextArea';
import ProfileAvatar from 'assets/img/avatar/profile.png';

const ViewEvent = ({ eventEntertainerId }) => {
  const [eventEntertainer, setEventEntertainer] = React.useState({});
  let loading = false;
  React.useEffect(() => {
    eventEntertainerId &&
      axios
        .get(`/api/v1/events/entertainers/${eventEntertainerId}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setEventEntertainer(data.event);
          }
        })
        .catch(function (error) {
          // console.log(error.response.data.message);
          // TODO: navigate to all events
        });
  }, [eventEntertainerId]);

  if (!eventEntertainer.event) {
    loading = true;
  }

  return (
    <BackEndPage loading={loading} title="View Event">
      <div className="main-app">
        <TopMessage />

        {!loading && (
          <section className="app-content">
            {/* Event Name and Event Status */}
            <section className="row">
              <div className="col-sm-12">
                <h3 className="main-app__title">
                  {eventEntertainer.event.eventType} <br />{' '}
                  <small className="main-app__small remaining-time">
                    {!eventHasExpired(eventEntertainer.event.eventDate) && (
                      <>
                        <i className="icon icon-hourglass"></i>{' '}
                        {remainingDays(eventEntertainer.event.eventDate)}
                      </>
                    )}
                  </small>
                </h3>
              </div>
            </section>

            {/* Event Details and Entertainers */}
            <aside className="row">
              <div className="col-sm-12 mt-3">
                {eventIsOngoing(
                  eventEntertainer.event.eventDate,
                  eventEntertainer.event.eventDuration
                ) && (
                  <AlertMessage
                    message="Event is currently ongoing."
                    type="info"
                  />
                )}
                {eventHasExpired(eventEntertainer.event.eventDate) &&
                  !eventIsOngoing(
                    eventEntertainer.event.eventDate,
                    eventEntertainer.event.eventDuration
                  ) && (
                    <AlertMessage
                      message="Event Date has passed"
                      type="error"
                    />
                  )}
              </div>
              <div className="col-md-6">
                <h3 className="main-app__subtitle mt-5 text-red">
                  Event Details
                </h3>
                <ul className="list-group transparent">
                  <ViewEvent.OwnerDetailsCard
                    owner={eventEntertainer.event.owner}
                  />
                  <ViewEvent.EventDetailsCard event={eventEntertainer.event} />
                </ul>
              </div>
              <div className="col-md-6">
                <h3 className="main-app__subtitle mt-5  text-yellow">
                  Event Requirements
                </h3>
                <ViewEvent.EventEntertainerDetailsCard
                  eventEntertainer={eventEntertainer}
                />
                <ViewEvent.CancelEvent eventEntertainer={eventEntertainer} />
              </div>
            </aside>
          </section>
        )}
      </div>
    </BackEndPage>
  );
};

ViewEvent.propTypes = {
  eventEntertainerId: PropTypes.string,
};

ViewEvent.defaultProps = {
  eventEntertainerId: null,
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

ViewEvent.OwnerDetailsCard = ({ owner }) => {
  const defaultOwner = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    phoneNumber2: '',
  };
  const sanitizedOwner = { ...defaultOwner, ...owner };
  return (
    <>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-user-circle"></i>
          Name
        </small>
        <h5 className="event-list-label text-muted-light-2">
          {`${sanitizedOwner.firstName} ${sanitizedOwner.lastName}`}
        </h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-vcard"></i> Phone Number
        </small>
        <h5 className="event-list-label text-muted-light-2">
          {sanitizedOwner.phoneNumber}
        </h5>
      </li>
      {sanitizedOwner.phoneNumber2 && (
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-vcard"></i>
            Phone Number 2
          </small>
          <h5 className="event-list-label text-muted-light-2">
            {sanitizedOwner.phoneNumber2}
          </h5>
        </li>
      )}
    </>
  );
};

ViewEvent.OwnerDetailsCard.propTypes = {
  owner: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    phoneNuber2: PropTypes.string,
  }),
  showAddress: PropTypes.bool,
  transparent: PropTypes.bool,
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

ViewEvent.EventDetailsCard = ({ event, showAddress, transparent }) => {
  const sanitizedEvent = { ...defaultEvent, ...event };
  return (
    <>
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
    </>
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

ViewEvent.EventEntertainerDetailsCard.propTypes = {
  eventEntertainer: PropTypes.object.isRequired,
};

ViewEvent.EntertainersTable = ({ eventEntertainers }) => {
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
                  <h3 className="event-title text-white">
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
    <h3 className="text-white event-title ml-0 mt-5">
      You have no Entertainer in Review
    </h3>
  );
};

ViewEvent.EntertainersTable.propTypes = {
  eventEntertainers: PropTypes.array.isRequired,
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
              ProfileAvatar
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
  entertainer: PropTypes.object,
};
ViewEvent.HireEntertainersRow.defaultProps = {
  entertainer: {},
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
  eventEntertainer: PropTypes.object,
};
ViewEvent.PendingEntertainersRow.defaultProps = {
  eventEntertainer: {},
};

ViewEvent.CancelEvent = ({ eventEntertainer }) => {
  return (
    <div className="text-right cancel-event__text mt-3 mb-5">
      <DuvLiveModal
        body={<CancelEventForm eventEntertainerId={eventEntertainer.id} />}
        closeModalText="Cancel"
        title="Cancel Performance"
      >
        <>
          <i className="icon icon-cancel"></i> Cancel Performance
        </>
      </DuvLiveModal>
    </div>
  );
};

ViewEvent.CancelEvent.propTypes = {
  eventEntertainer: PropTypes.object,
};

ViewEvent.CancelEvent.defaultProps = {
  eventEntertainer: {},
};

const CancelEventForm = ({ eventEntertainerId }) => {
  const [message, setMessage] = React.useState({});
  let { userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      initialValues={setInitialValues(cancelEventSchema)}
      onSubmit={(values, actions) => {
        axios
          .post(
            `/api/v1/evententertainer/not-available/${eventEntertainerId}`,
            values,
            {
              headers: { 'x-access-token': getTokenFromStore() },
            }
          )
          .then(function (response) {
            const { status, data } = response;
            console.log('data', data);
            if (status === 200) {
              userDispatch({
                type: 'add-alert',
                alert: 'cancel-event-success',
              });
              navigate('/entertainer/events');
              actions.resetForm();
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
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
              Inform the event host and DUV LIVE of any cancellation at least
              48hrs before the event date. Failure to do so (except due to
              reasons considered under Force Majeure) shall result in the
              removal of the entertainer's account, the blacklisting of the
              User's Personal Details on the DUV LIVE online platform, and any
              other legal action deemed reasonably necessary by the affected
              persons.Do you wish to proceed with the cancellation?
            </div>
            <Button
              className="btn-info btn-wide btn-transparent mt-2"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Yes, Cancel Performance
            </Button>
          </Form>
        </>
      )}
      validationSchema={createSchema(cancelEventSchema)}
    />
  );
};

CancelEventForm.propTypes = {
  eventEntertainerId: PropTypes.any.isRequired,
};

export default ViewEvent;
