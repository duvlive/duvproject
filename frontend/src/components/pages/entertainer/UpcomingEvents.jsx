import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import { Link } from '@reach/router';
import Timeago from 'react-timeago';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getEventDate, getTime, getTimeOfDay } from 'utils/date-helpers';
import NoContent from 'components/common/utils/NoContent';
import { userCanAddEntertainer } from 'utils/event-helpers';
import { getTokenFromStore } from 'utils/localStorage';
import { parse } from 'date-fns';

const Events = () => {
  const [showPastEvents, setShowPastEvents] = React.useState(false);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('/api/v1/events/entertainers', {
        headers: {
          'x-access-token': getTokenFromStore()
        }
      })
      .then(function(response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        if (status === 200) {
          setEvents(data.events);
          console.log('data.events: ', data);
        }
      })
      .catch(function(error) {
        console.log(error.response.data.message);
        // navigate to all events
      });
  }, []);

  console.log('events', events);
  // Sort event according - Today, Upcoming and Past
  let allEvents = events.reduce(
    (result, { event }) => {
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

  return (
    <BackEndPage title="Upcoming Events">
      <div className="main-app">
        <TopMessage message="Upcoming Events" />

        <section className="app-content">
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
            <NoContent text="You have no upcoming events." />
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
  title: PropTypes.string.isRequired
};

Events.CardList.defaultProps = {
  events: []
};

Events.Card = ({
  id,
  eventType,
  eventDate,
  startTime,
  eventDuration,
  lga,
  state,
  owner
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
  eventDate: PropTypes.string,
  eventDuration: PropTypes.string,
  eventType: PropTypes.string,
  id: PropTypes.number,
  lga: PropTypes.string,
  owner: PropTypes.object.isRequired,
  startTime: PropTypes.string,
  state: PropTypes.string
};

Events.Card.defaultProps = {
  id: '0',
  eventDuration: null,
  eventDate: null,
  eventType: null,
  lga: null,
  startTime: null,
  state: null
};
export default Events;
