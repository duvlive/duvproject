import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import { Link } from '@reach/router';
import Timeago from 'react-timeago';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getEventDate, getTime, getTimeOfDay } from 'utils/date-helpers';
import NoContent from 'components/common/utils/NoContent';
import { getTokenFromStore } from 'utils/localStorage';
import { parse } from 'date-fns';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';
import LoadItems from 'components/common/utils/LoadItems';

const Events = () => {
  const { userState, userDispatch } = React.useContext(UserContext);
  const [message, setMessage] = React.useState({ msg: null, type: null });
  const [showPastEvents, setShowPastEvents] = React.useState(false);
  const [events, setEvents] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('/api/v1/events/entertainers', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setEvents(data.events);
        }
      })
      .catch(function (error) {
        // console.log(error.response.data.message);
        // navigate to all events
        setEvents([]);
      });
  }, []);

  // Sort event according - Today, Upcoming and Past
  let allEvents = (events || []).reduce(
    (result, { id, event }) => {
      event.eventEntertainerId = id; // use the evententertainer id here
      if (parse(event.eventDate).toDateString() === new Date().toDateString()) {
        result.today.push(event);
      } else if (parse(event.eventDate) > Date.now()) {
        result.upcoming.push(event);
      } else {
        result.past.push(event);
      }
      return result;
    },
    { today: [], upcoming: [], past: [] }
  );

  const togglePastEvents = () => setShowPastEvents(!showPastEvents);

  const hasActiveEvents =
    allEvents.today.length > 0 || allEvents.upcoming.length > 0;

  if (userState && userState.alert === 'cancel-event-success') {
    !message.msg &&
      setMessage({
        msg: 'You have been successfully remove from the event',
        type: 'danger',
      });
    userDispatch({
      type: 'remove-alert',
    });
  }

  return (
    <BackEndPage title="Upcoming Events">
      <div className="main-app">
        <TopMessage />

        <section className="app-content">
          {!hasActiveEvents && events && allEvents.past.length > 0 && (
            <AlertMessage message="You have no upcoming events" type="info" />
          )}
          <div className="mt-4">
            <AlertMessage message={message.msg} type={message.type} />
          </div>

          <LoadItems
            items={events}
            noContent={<NoContent text="No events found" />}
          >
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
          </LoadItems>
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
      {title && (
        <tr className="transparent">
          <td colSpan="5">
            <h3 className={`event-title`}>{title}</h3>
          </td>
        </tr>
      )}
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
  title: PropTypes.string,
};

Events.CardList.defaultProps = {
  title: null,
  events: [],
};

Events.Card = ({
  eventEntertainerId,
  eventType,
  eventDate,
  startTime,
  eventDuration,
  lga,
  state,
  owner,
}) => {
  return (
    <>
      <tr className="transparent">
        <td colSpan="5">
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
        <td>
          <div className="table__title text-white">{eventType}</div>
          <span className="small--2">Duration: {eventDuration} &nbsp;</span>
        </td>
        <td>
          <span className="text-yellow">
            <i className="icon icon-user-circle text-color" /> &nbsp;
            {owner.firstName + ' ' + owner.lastName} &nbsp;
          </span>
          <span>
            <i className="icon icon-location" /> &nbsp;
            {lga}, {state} State
          </span>
        </td>
        <td className="text-right">
          <Link
            className="btn btn-info btn-transparent"
            to={`/entertainer/events/view/${eventEntertainerId}`}
          >
            View Event
          </Link>
        </td>
      </tr>
    </>
  );
};

Events.Card.propTypes = {
  eventDate: PropTypes.string,
  eventDuration: PropTypes.string,
  eventEntertainerId: PropTypes.any,
  eventType: PropTypes.string,
  lga: PropTypes.string,
  owner: PropTypes.object.isRequired,
  startTime: PropTypes.string,
  state: PropTypes.string,
};

Events.Card.defaultProps = {
  eventEntertainerId: '0',
  eventDuration: null,
  eventDate: null,
  eventType: null,
  lga: null,
  startTime: null,
  state: null,
};
export default Events;
