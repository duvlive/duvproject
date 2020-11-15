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
import {
  twoDigitNumber,
  moneyFormat,
  getItems,
  getRequestStatusIcon,
} from 'utils/helpers';
import {
  getEventDate,
  getTime,
  getTimeOfDay,
  getShortDate,
} from 'utils/date-helpers';
import { groupEvents, userCanAddEntertainer } from 'utils/event-helpers';
import { Link } from '@reach/router';
import LoadItems from 'components/common/utils/LoadItems';
import WelcomeSlides from 'components/common/utils//WelcomeSlides';
import welcomeSlide from 'data/firstTimeUser';
import { InviteFriendsForm } from 'components/common/pages/InviteFriends';
import ProfileAvatar from 'assets/img/avatar/profile.png';

const Dashboard = () => {
  let { userState } = React.useContext(UserContext);
  const [pendingReview, setPendingReview] = React.useState(null);
  const [applications, setApplications] = React.useState({
    requests: null,
    bids: null,
  });

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

  React.useEffect(() => {
    axios
      .get(`/api/v1/user/reviews/pending`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setPendingReview(data.info);
        }
      })
      .catch(function (error) {
        setPendingReview([]);
      });
  }, []);

  const topMessage = userState.firstTimeLogin ? 'Hello' : 'Welcome back';
  // Sort event according - Today, Upcoming and Past
  const allEvents = groupEvents(userState.events || []);
  const eventsToShow = userState.events
    ? getItems([...allEvents.today, ...allEvents.upcoming], 3)
    : null;

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
                    items={eventsToShow}
                    noContent={
                      <NoContent
                        isButton
                        linkText="Add a New Event"
                        linkTo="/user/events/new"
                        text="You have no Upcoming Events"
                      />
                    }
                  >
                    <Dashboard.UpcomingEvents events={eventsToShow || []} />
                  </LoadItems>
                </div>
              </div>
              <Dashboard.RecentApplications
                bids={getItems(applications.bids, 4) || null}
                requests={getItems(applications.requests, 2) || null}
              />
            </div>
            <div className="col-sm-4">
              <Dashboard.InviteFriends />
              <LoadItems
                items={pendingReview ? [pendingReview] : null}
                noContent={<Dashboard.NoPendingReview />}
              >
                {pendingReview && pendingReview.entertainer && (
                  <Dashboard.PendingReview info={pendingReview} />
                )}
              </LoadItems>
            </div>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

Dashboard.UpcomingEvents = ({ events }) => {
  return (
    <>
      <h5 className="card-title text-green header__with-border">
        Upcoming Events
      </h5>
      <div className="table-responsive">
        <table className="table table-dark table__no-border table__with-bg">
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

Dashboard.NoPendingReview = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red header__with-border">
        Pending Review
      </h5>
      <NoContent text="No pending Reviews." />
    </div>
  </div>
);

Dashboard.PendingReview = ({ info }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red header__with-border">
        Pending Review
      </h5>
      <p className="card-text">
        To serve you better, kindly help us improve our service and give other
        users a better understanding about entertainers.
      </p>

      <div className="text-center">
        <img
          alt={info.entertainer.stageName}
          className="rounded-circle img-thumbnail img-responsive avatar--large"
          src={info.entertainer.personalDetails.profileImageURL}
          title={info.entertainer.stageName}
        />{' '}
        <h5 className="card-subtitle card-subtitle--2 mt-3 mb-0 white">
          {info.entertainer.stageName}
        </h5>
        <small className="card-subtitle--3 text-muted">
          {info.entertainer.entertainerType} at {info.event.eventType} on{' '}
          {getShortDate(info.event.eventDate)}
        </small>
        <div className="mt-3">
          <Link
            className="btn btn-danger btn-wide btn-transparent"
            to={`/user/review-entertainer/${info.id}`}
          >
            Rate Now
          </Link>
        </div>
      </div>
    </div>
  </div>
);

Dashboard.PendingReview.propTypes = {
  info: PropTypes.object.isRequired,
};

Dashboard.RecentApplications = ({ bids, requests }) => (
  <LoadItems
    items={requests && bids ? [...requests, ...bids] : null}
    noContent={<Dashboard.NoRequestFound />}
  >
    {requests && requests.length > 0 && (
      <div className="card card-custom">
        <div className="card-body">
          <div className="table-responsive">
            <h5 className="card-title text-blue header__with-border">
              Recent Requests
            </h5>
            <table className="table table-dark  table__no-border table__with-bg">
              <tbody>
                {requests.map((request, index) => (
                  <Dashboard.RequestTableRow
                    application={request}
                    key={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
    {bids && bids.length > 0 && (
      <div className="card card-custom">
        <div className="card-body">
          <div className="table-responsive">
            <h5 className="card-title text-white header__with-border">
              Recent Bids
            </h5>
            <table className="table table-dark  table__no-border table__with-bg">
              <tbody>
                {bids.map((bid, index) => (
                  <Dashboard.RequestTableRow application={bid} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
  </LoadItems>
);

Dashboard.RecentApplications.propTypes = {
  bids: PropTypes.array,
  requests: PropTypes.array,
};

Dashboard.RecentApplications.defaultProps = {
  bids: null,
  requests: null,
};

Dashboard.RequestTableRow = ({ application }) => {
  const isBid = application.type === 'Bid';
  return (
    <tr>
      <td className="align-middle">
        <Image
          className="avatar--medium--small"
          name={application.stageName || 'No name'}
          responsiveImage={false}
          src={application.profileImageURL || ProfileAvatar}
        />
      </td>
      <td className="align-middle text-gray">
        <span className="text-muted small--4">Stage name</span>{' '}
        {application.stageName}
      </td>
      <td className="align-middle text-yellow">
        <span className="text-muted small--4">
          {isBid ? 'Asking Price' : 'Your Offer'}
        </span>{' '}
        &#8358; {moneyFormat(application.askingPrice)}
      </td>
      {isBid ? (
        <td className="align-middle text-white">
          <span className="text-muted small--4">Event Type</span>{' '}
          {application.eventType}
        </td>
      ) : (
        <td className="align-middle">
          <span className="text-muted small--4">Status</span>
          <small>{getRequestStatusIcon(application.status)}</small>
        </td>
      )}
      <td className="align-middle text-right td-btn">
        <Link
          className="btn btn-danger btn-sm btn-transparent"
          to={
            isBid
              ? `/user/request/view/${application.eventEntertainerId}`
              : `/user/request/view/${application.applicationId}`
          }
        >
          View Details
        </Link>
        &nbsp;&nbsp;&nbsp;
        <a
          className="btn btn-info btn-sm btn-transparent"
          href={`/entertainers/profile/${application.slug}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Profile
        </a>
      </td>
    </tr>
  );
};

Dashboard.RequestTableRow.propTypes = {
  application: PropTypes.object.isRequired,
};

Dashboard.InviteFriends = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-blue header__with-border">
        Recommend a Friend
      </h5>
      <InviteFriendsForm widget />
    </div>
  </div>
);

Dashboard.NoRequestFound = () => (
  <div className="card card-custom">
    <div className="card-body">
      <NoContent text="No Request found" />
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
