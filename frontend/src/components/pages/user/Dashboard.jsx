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
import { commaNumber } from 'utils/helpers';
import {
  getEventDate,
  getTime,
  getNumberOfDaysToEvent,
} from 'utils/date-helpers';

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

  return (
    <BackEndPage title="Dashboard">
      <div className="main-app">
        <TopMessage message={`Welcome back ${userState.firstName},`} />
        <section className="app-content">
          <div className="row">
            <div className="col-sm-8">
              <div className="card card-custom">
                <div className="card-body">
                  <h5 className="card-title text-green">Upcoming Events</h5>
                  {userState.events ? (
                    <Dashboard.UpcomingEvents events={userState.events} />
                  ) : (
                    <NoContent
                      isButton
                      linkText="Add a New Event"
                      linkTo="/user/events/new"
                      text="You have no Upcoming Events"
                    />
                  )}
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

Dashboard.UpcomingEvents = ({ events }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border">
      <tbody>
        {events.map((event, index) => (
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
);

Dashboard.UpcomingEvents.propTypes = {
  events: PropTypes.array.isRequired,
};

Dashboard.UpcomingEventsRow = ({ event, number }) => (
  <tr>
    <th className="table__number" scope="row">
      {commaNumber(number)}
    </th>
    <td>
      <div className="table__title text-white">{event.eventType}</div>
      <span>
        <i className="icon icon-location" />
        {event.lga}, {event.state} state
      </span>
    </td>
    <td>
      <span className="text-red">
        {getNumberOfDaysToEvent(event.eventDate)}
      </span>
      <span>
        <strong className="text-blue"> {event.eventDuration}</strong>
      </span>
    </td>
    <td className="text-right">
      <span>
        <i className="icon icon-clock" /> {getEventDate(event.eventDate)}
      </span>
      <span>{getTime(event.startTime)}</span>
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
