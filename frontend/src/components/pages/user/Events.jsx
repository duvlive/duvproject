import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import Avatars from 'components/common/utils/Avatars';
import { Link } from '@reach/router';
import Timeago from 'react-timeago';
import BackEndPage from 'components/common/layout/BackEndPage';
import { UserContext } from 'context/UserContext';
import { getEventDate, getTime } from 'utils/date-helpers';
import { parse } from 'date-fns';
import NoContent from 'components/common/utils/NoContent';

const Events = () => {
  const { userState } = React.useContext(UserContext);
  const events = userState && userState.events;
  const [showPastEvents, setShowPastEvents] = React.useState(false);
  // Sort event according - Today, Upcoming and Past
  let allEvents = events.reduce(
    (result, event) => {
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
    <BackEndPage title="My Events">
      <div className="main-app">
        <TopMessage message="All Events" />

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
  endTime,
  lga,
  state,
  entertainers
}) => {
  const entertainerTypes =
    (entertainers &&
      entertainers.map(({ entertainerType }) => entertainerType)) ||
    [];
  const hireTypes =
    (entertainers && entertainers.map(({ hireType }) => hireType)) || [];
  const entertainersDetails =
    (entertainers && entertainers.map(({ entertainer }) => entertainer)) || [];

  const stageNames =
    (entertainersDetails &&
      entertainersDetails.map(
        entertainer => entertainer && entertainer.stageName
      )) ||
    [];
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
            {getTime(startTime)} - {getTime(endTime)}
          </span>
        </td>
        <td>
          <div className="table__title text-white">{eventType}</div>
          <span>
            <i className="icon icon-location" />
            {lga}, {state} State
          </span>
        </td>
        <td>
          <span className="text-yellow">
            {entertainerTypes.join(', ')} &nbsp;
          </span>
          <span> {stageNames.join(', ') || hireTypes.join(', ')} &nbsp;</span>
        </td>
        <td className="text-right pr-5">
          {false && <Avatars entertainers={entertainersDetails} />}
        </td>
        <td className="text-right">
          <Link
            className="btn btn-danger btn-transparent"
            to={`/user/events/${id}/add-entertainer`}
          >
            Add Entertainer
          </Link>
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
  endTime: PropTypes.string,
  entertainers: PropTypes.array,
  eventDate: PropTypes.string,
  eventType: PropTypes.string,
  id: PropTypes.number,
  lga: PropTypes.string,
  startTime: PropTypes.string,
  state: PropTypes.string
};

Events.Card.defaultProps = {
  id: '0',
  endTime: null,
  entertainers: [],
  eventDate: null,
  eventType: null,
  lga: null,
  startTime: null,
  state: null
};
export default Events;
