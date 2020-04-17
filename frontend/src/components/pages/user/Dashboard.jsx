import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import Image from 'components/common/utils/Image';
import axios from 'axios';
import BackEndPage from 'components/common/layout/BackEndPage';
import { UserContext } from 'context/UserContext';
import NoContent from 'components/common/utils/NoContent';
import { getTokenFromStore } from 'utils/localStorage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { twoDigitNumber } from 'utils/helpers';
import { getEventDate, getTime, getTimeOfDay } from 'utils/date-helpers';
import { groupEvents, userCanAddEntertainer } from 'utils/event-helpers';
import { Link } from '@reach/router';
import LoadItems from 'components/common/utils/LoadItems';
import WelcomeSlides from './WelcomeSlides';
import welcomeSlide from 'data/welcome';

const Dashboard = () => {
  let { userState } = React.useContext(UserContext);
  const [entertainers, setEntertainers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`/api/v1/entertainers/recommend/random`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setEntertainers(data.entertainers);
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);

  const topMessage = userState.firstTimeLogin ? 'Hello' : 'Welcome back';

  // if (userState.firstTimeLogin) {
  //   return <WelcomeSlides items/>;
  // }
  return (
    <BackEndPage title="Dashboard">
      <div className="main-app">
        <TopMessage message={`${topMessage} ${userState.firstName},`} />
        <WelcomeSlides items={welcomeSlide} />
        <section className="app-content">
          <div className="row">
            <div className="col-sm-8">
              <div className="card card-custom">
                <div className="card-body">
                  <LoadItems
                    items={userState.events}
                    noContent={
                      <NoContent
                        isButton
                        linkText="Add a New Event"
                        linkTo="/user/events/new"
                        text="You have no Upcoming Events"
                      />
                    }
                  >
                    <Dashboard.UpcomingEvents events={userState.events} />
                  </LoadItems>
                </div>
              </div>
              <Dashboard.AuctionTable />
            </div>
            <div className="col-sm-4">
              <Dashboard.RecommendedTable
                entertainers={entertainers}
                loading={loading}
              />
              <Dashboard.PendingReview />
            </div>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

Dashboard.UpcomingEvents = ({ events }) => {
  console.log('events upcoimngEvents', events);
  // Sort event according - Today, Upcoming and Past
  let allEvents = groupEvents(events);
  let eventsToShow = [];
  let title = 'Upcoming Events';

  if (allEvents.today.length > 0) {
    eventsToShow = allEvents.today;
    title = 'Today Events';
  } else if (allEvents.upcoming.length > 0) {
    eventsToShow = allEvents.upcoming;
  } else if (allEvents.past.length > 0) {
    eventsToShow = allEvents.past;
    title = 'Past Events';
  }

  return (
    <>
      <h5 className="card-title text-green">{title}</h5>
      <div className="table-responsive">
        <table className="table table-dark table__no-border">
          <tbody>
            {eventsToShow.map((event, index) => (
              <Dashboard.UpcomingEventsRow
                event={event}
                key={index}
                number={index + 1}
              />
            ))}
          </tbody>
        </table>
        <div className="pt-4" />
      </div>
    </>
  );
};

Dashboard.UpcomingEvents.propTypes = {
  events: PropTypes.array.isRequired,
};

Dashboard.UpcomingEventsRow = ({ event, number }) => (
  <tr>
    <th className="table__number" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className="pl-4">
      <span className="subtitle--2 text-red text-uppercase">
        {getEventDate(event.eventDate)}
      </span>
      <span className="small--3 text-gray">
        {getTime(event.startTime)} ({getTimeOfDay(event.startTime)})
      </span>
    </td>
    <td>
      <div className="table__title text-white">{event.eventType}</div>
      <span>
        <i className="icon icon-location" />
        {event.lga}, {event.state} State
      </span>
    </td>
    <td className="text-right">
      {userCanAddEntertainer(event.eventDate) && (
        <Link
          className="btn btn-danger btn-transparent"
          to={`/user/events/${event.id}/add-entertainer`}
        >
          Add Entertainer
        </Link>
      )}
      &nbsp; &nbsp; &nbsp;
      <Link
        className="btn btn-info btn-transparent"
        to={`/user/events/view/${event.id}`}
      >
        View Event
      </Link>
    </td>
  </tr>
);

Dashboard.UpcomingEventsRow.propTypes = {
  event: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
};

Dashboard.PendingReview = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red header__with-border">
        Pending Review
      </h5>
      <NoContent text="No pending Reviews." />
    </div>
  </div>
);

Dashboard.AuctionTable = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-blue">Auction (Recent Bids)</h5>
      <NoContent
        linkText="Learn how it works"
        linkTo="/user/events/new"
        text="You have no current Auctions."
      />
    </div>
  </div>
);

Dashboard.RecommendedTable = ({ entertainers, loading }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-blue">Recommended For You</h5>
      <div className="table-responsive">
        {loading ? (
          <LoadingScreen loading={loading} />
        ) : (
          <table className="table table-dark">
            <tbody>
              <>
                {entertainers.map((entertainer) => (
                  <Dashboard.RecommendedRow
                    entertainer={entertainer}
                    key={entertainer.stageName}
                  />
                ))}
              </>
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
);

Dashboard.RecommendedTable.propTypes = {
  entertainers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

Dashboard.RecommendedRow = ({ entertainer }) => (
  <tr>
    <td>
      <Image
        className="avatar--small"
        name={entertainer.stageName}
        src={entertainer.profileImageURL}
      />
    </td>
    <td>
      <span className="text-truncate--1">{entertainer.stageName}</span>
    </td>
    <td>
      <span className="text-yellow small--3">
        {entertainer.entertainerType}
      </span>
    </td>
    <td>
      <span className="small--3">{4.5}</span>
    </td>
  </tr>
);

Dashboard.RecommendedRow.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

export default Dashboard;
