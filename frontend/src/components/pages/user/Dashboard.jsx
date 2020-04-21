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
import { twoDigitNumber, moneyFormat } from 'utils/helpers';
import { getEventDate, getTime, getTimeOfDay } from 'utils/date-helpers';
import { groupEvents, userCanAddEntertainer } from 'utils/event-helpers';
import { Link } from '@reach/router';
import LoadItems from 'components/common/utils/LoadItems';
import WelcomeSlides from './WelcomeSlides';
import welcomeSlide from 'data/welcome';
import { InviteFriendsForm } from 'components/common/pages/InviteFriends';

const Dashboard = () => {
  let { userState } = React.useContext(UserContext);
  const [entertainers, setEntertainers] = React.useState([]);
  const [applications, setApplications] = React.useState({
    requests: null,
    bids: null,
  });
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

  React.useEffect(() => {
    axios
      .get(`/api/v1/applications/dashboard/user`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setApplications(data.results);
        }
      })
      .catch(function (error) {
        setApplications([]);
      });
  }, []);

  const topMessage = userState.firstTimeLogin ? 'Hello' : 'Welcome back';
  const pendingReview = false;

  return (
    <BackEndPage title="Dashboard">
      <div className="main-app">
        <TopMessage message={`${topMessage} ${userState.firstName},`} />
        {userState.firstTimeLogin && <WelcomeSlides items={welcomeSlide} />}
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
                    <Dashboard.UpcomingEvents events={userState.events || []} />
                  </LoadItems>
                </div>
              </div>
              <Dashboard.RecentApplications
                bids={applications.bids}
                requests={applications.requests}
              />
            </div>
            <div className="col-sm-4">
              <Dashboard.RecommendedTable
                entertainers={entertainers}
                loading={loading}
              />
              {pendingReview ? (
                <Dashboard.PendingReview />
              ) : (
                <Dashboard.InviteFriends />
              )}
            </div>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

Dashboard.UpcomingEvents = ({ events }) => {
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

Dashboard.RecentApplications = ({ bids, requests }) => (
  <LoadItems
    items={(requests && bids && [...requests, ...bids]) || null} //todo
    noContent={<NoContent text="No Request found" />}
  >
    {requests && requests.length > 0 && (
      <div className="table-responsive">
        <h6 className="font-weight-normal text-white mt-4">Recent Requests</h6>
        <table className="table table-dark  table__no-border table__with-bg">
          <tbody>
            {requests.map((request, index) => (
              <Dashboard.RequestTableRow
                application={request || []}
                key={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    )}
    {bids && bids.length > 0 && (
      <div className="table-responsive">
        <h6 className="font-weight-normal text-white mt-4">Recent Bids</h6>
        <table className="table table-dark  table__no-border table__with-bg">
          <tbody>
            {bids.map((bid, index) => (
              <Dashboard.RequestTableRow application={bid || []} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    )}
  </LoadItems>
);

Dashboard.RecentApplications.propTypes = {
  bids: PropTypes.object,
  requests: PropTypes.object,
};

Dashboard.RecentApplications.defaultProps = {
  bids: null,
  requests: null,
};

Dashboard.RequestTableRow = ({ application }) => (
  <tr>
    <td className="align-middle">
      <Image
        className="avatar--medium-small"
        name={application.stageName || 'No name'}
        responsiveImage={false}
        src={application.profileImageURL || 'No src'}
      />
    </td>
    <td className="align-middle text-gray">
      <span className="text-muted small--4">Stage name</span>{' '}
      {application.stageName}
    </td>
    <td className="align-middle text-yellow">
      <span className="text-muted small--4">Asking Price</span> &#8358;{' '}
      {moneyFormat(application.askingPrice)}
    </td>
    <td className="align-middle text-gray">
      <span className="text-muted small--4">Location</span>{' '}
      {application.location}
    </td>
    <td className="align-middle text-right td-btn">
      <a
        className="btn btn-info btn-sm btn-transparent"
        href={`/entertainers/${application.slug}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        View Profile
      </a>
    </td>
  </tr>
);

Dashboard.RequestTableRow.propTypes = {
  application: PropTypes.object.isRequired,
};

Dashboard.InviteFriends = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red header__with-border">
        Recommend a Friend
      </h5>
      <InviteFriendsForm widget />
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
