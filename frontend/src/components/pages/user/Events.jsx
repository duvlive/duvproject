import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import Avatars from 'components/common/utils/Avatars';
import { Link } from '@reach/router';
import Timeago from 'react-timeago';
import BackEndPage from 'components/common/layout/BackEndPage';
import { UserContext } from 'context/UserContext';
import { getEventDate, getTime } from 'utils/date-helpers';

const Events = () => {
  const { userState } = React.useContext(UserContext);
  const events = userState && userState.events;
  console.log('events', events);
  return (
    <BackEndPage title="My Events">
      <div className="main-app">
        <TopMessage message="Upcoming Events" />

        <section className="app-content">
          <div className="table-responsive">
            <table className="table table-dark table__no-border table__with-bg">
              <tbody>
                <Events.CardList events={events} />
              </tbody>
            </table>
            <br />
            <br />
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

Events.CardList = ({ events }) =>
  events
    ? events.map((event, index) => <Events.Card key={index} {...event} />)
    : null;

Events.Card = ({
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
  const entertainersDetails =
    (entertainers && entertainers.map(({ entertainer }) => entertainer)) || [];

  const stageNames =
    (entertainersDetails &&
      entertainersDetails.map(
        entertainer => entertainer && entertainer.stageName
      )) ||
    [];
  console.log('stageNames: ', stageNames);
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
          <span> {stageNames.join(', ')} &nbsp;</span>
        </td>
        <td className="text-right pr-5">
          <Avatars entertainers={entertainersDetails} />
        </td>
        <td className="text-right">
          <Link className="btn btn-info btn-transparent" to="/user/events/1">
            View Event
          </Link>
        </td>
      </tr>
    </>
  );
};

Events.Card.propTypes = {
  endTime: PropTypes.string,
  entertainers: PropTypes.string,
  eventDate: PropTypes.string,
  eventType: PropTypes.string,
  lga: PropTypes.string,
  startTime: PropTypes.string,
  state: PropTypes.string
};

Events.Card.defaultProps = {
  endTime: null,
  entertainers: null,
  eventDate: null,
  eventType: null,
  lga: null,
  startTime: null,
  state: null
};
export default Events;
