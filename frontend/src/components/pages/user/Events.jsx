import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import Avatars from 'components/common/utils/Avatars';
import { Link } from '@reach/router';
import Timeago from 'react-timeago';
import BackEndPage from 'components/common/layout/BackEndPage';
import { UserContext } from 'context/UserContext';
import { getEventDate, getTime, getTimeOfDay } from 'utils/date-helpers';
import { groupEvents } from 'utils/event-helpers';
import NoContent from 'components/common/utils/NoContent';
import { countOccurences } from 'utils/helpers';
import { userCanAddEntertainer } from 'utils/event-helpers';
import AlertMessage from 'components/common/utils/AlertMessage';

const Events = () => {
  const { userState, userDispatch } = React.useContext(UserContext);
  const [message, setMessage] = React.useState({ msg: null, type: null });
  const events = (userState && userState.events) || [];
  const [showPastEvents, setShowPastEvents] = React.useState(false);
  // Sort event according - Today, Upcoming and Past
  let allEvents = groupEvents(events);

  const togglePastEvents = () => setShowPastEvents(!showPastEvents);

  const hasActiveEvents =
    allEvents.today.length > 0 || allEvents.upcoming.length > 0;

  if (userState && userState.alert === 'place-bid-success') {
    !message.msg &&
      setMessage({
        msg: 'Your event has been successfully cancelled',
        type: 'danger',
      });
    userDispatch({
      type: 'remove-alert',
    });
  }

  return (
    <BackEndPage title="My Events">
      <div className="main-app">
        <TopMessage message="All Events" />

        <section className="app-content">
          <div className="text-right">
            <Link
              className="btn btn-danger btn-transparent btn-wide"
              to="/user/events/new"
            >
              <span className="icon icon-events"></span> New Event
            </Link>
          </div>
          <div className="mt-4">
            <AlertMessage message={message.msg} type={message.type} />
          </div>
          {events.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-dark table__no-border table__with-bg">
                <tbody>
                  <Events.CardList
                    events={allEvents.today}
                    title="Today's Event"
                  />
                  <Events.CardList
                    events={allEvents.upcoming}
                    title="Upcoming Events"
                  />
                  {(showPastEvents || !hasActiveEvents) && (
                    <Events.CardList
                      events={allEvents.past}
                      title="Past Events"
                    />
                  )}
                </tbody>
              </table>
              {!showPastEvents && hasActiveEvents && allEvents.past.length > 0 && (
                <button
                  className="btn btn-warning btn-lg btn-wide btn-transparent"
                  onClick={togglePastEvents}
                >
                  View Past Events
                </button>
              )}
              <br />
              <br />
            </div>
          ) : (
            <NoContent
              isButton
              linkText="Add a New Event"
              linkTo="/user/events/new"
              text="No Event Found"
            />
          )}
        </section>
      </div>
    </BackEndPage>
  );
};

Events.CardList = ({ events, title }) => {
  if (events.length === 0) return null;

  const eventCard = events.map((event, index) => (
    <Events.Card key={index} {...event} />
  ));
  return (
    <>
      <tr className="transparent">
        <td colSpan="5">
          <h3 className={`event-title`}>{title}</h3>
        </td>
      </tr>
      {eventCard}
      <tr className="transparent">
        <td colSpan="5">
          <div className={`event-spacer`} />
        </td>
      </tr>
    </>
  );
};

Events.CardList.propTypes = {
  events: PropTypes.array,
  title: PropTypes.string.isRequired,
};

Events.CardList.defaultProps = {
  events: [],
};

Events.Card = ({
  id,
  cancelled,
  eventType,
  eventDate,
  startTime,
  eventDuration,
  lga,
  state,
  entertainers,
}) => {
  const entertainerTypes =
    entertainers &&
    entertainers.reduce(
      (acc, currentEntertainer) => {
        !!currentEntertainer.entertainer
          ? acc.hired.push(currentEntertainer.entertainerType)
          : acc.review.push(currentEntertainer.entertainerType);
        return acc;
      },
      { hired: [], review: [] }
    );

  const entertainersAvatars =
    (entertainers &&
      entertainers
        .filter(({ entertainer }) => !!entertainer)
        .map((event) => event.entertainer)) ||
    [];

  return (
    <>
      <tr className="transparent">
        <td colSpan="6">
          <h4 className="main-app__subtitle">
            <Timeago date={eventDate} />
          </h4>
        </td>
      </tr>
      <tr>
        <td className="pl-4">
          <span className="subtitle--2 text-red text-uppercase">
            {getEventDate(eventDate)}
          </span>
          <span className="small--3 text-gray">
            {getTime(startTime)} ({getTimeOfDay(startTime)})
          </span>
        </td>
        {cancelled ? (
          <td>
            <div className="table__title text-white">{eventType}</div>
            <span>
              <i className="icon icon-location" />
              Cancelled
            </span>
          </td>
        ) : (
          <td>
            <div className="table__title text-white">{eventType}</div>
            <span>
              <i className="icon icon-location" />
              {lga}, {state} State
            </span>
          </td>
        )}
        <td>
          <span className="text-yellow">
            {entertainerTypes.review.length > 0 ? (
              <>{countOccurences(entertainerTypes.review).join(', ')} needed</>
            ) : (
              'No entertainer in review'
            )}{' '}
            &nbsp;
          </span>
          <span className="small--2">
            {' '}
            {entertainersAvatars.length > 0 ? (
              <>{countOccurences(entertainerTypes.hired).join(', ')} Hired</>
            ) : (
              'No Hired Entertainers'
            )}
            &nbsp;
          </span>
        </td>
        <td className="text-right pr-5">
          <Avatars entertainers={entertainersAvatars} />
        </td>
        <td className="text-right">
          {userCanAddEntertainer(eventDate) && (
            <Link
              className="btn btn-danger btn-transparent"
              to={`/user/events/${id}/add-entertainer`}
            >
              Add Entertainer
            </Link>
          )}
          &nbsp; &nbsp; &nbsp;
          <Link
            className="btn btn-info btn-transparent"
            to={`/user/events/view/${id}`}
          >
            View Event
          </Link>
        </td>
      </tr>
    </>
  );
};

Events.Card.propTypes = {
  entertainers: PropTypes.array,
  eventDate: PropTypes.string,
  eventDuration: PropTypes.string,
  eventType: PropTypes.string,
  id: PropTypes.number,
  lga: PropTypes.string,
  startTime: PropTypes.string,
  state: PropTypes.string,
};

Events.Card.defaultProps = {
  id: '0',
  eventDuration: null,
  entertainers: [],
  eventDate: null,
  eventType: null,
  lga: null,
  startTime: null,
  state: null,
};
export default Events;
