import React from 'react';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DashboardCard from 'components/common/utils/DashboardCard';
import Onboarding from 'components/pages/entertainer/Onboarding';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { twoDigitNumber } from 'utils/helpers';
import { InviteFriendsForm } from 'components/common/pages/InviteFriends';

const Dashboard = () => {
  const { userState } = React.useContext(UserContext);

  let currentDashboard;

  if (userState.entertainerProfile.approved == null) {
    currentDashboard = <LoadingScreen text="Loading your Dashboard" />;
  } else if (userState.entertainerProfile.approved === false) {
    currentDashboard = <Onboarding />;
  } else {
    currentDashboard = <DashboardItems />;
  }

  return (
    <BackEndPage title="Dashboard">
      <div className="main-app">{currentDashboard}</div>
    </BackEndPage>
  );
};

const DashboardItems = () => {
  const { userState } = React.useContext(UserContext);
  const [applications, setApplications] = React.useState({
    requests: null,
    auctions: null,
    upcomingEvents: null,
  });
  React.useEffect(() => {
    axios
      .get(`/api/v1/applications/dashboard/entertainer`, {
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
  console.log('applications', applications);
  return (
    <>
      <TopMessage message={`Welcome back ${userState.firstName},`} />
      <section className="app-content">
        <div className="row">
          {applications.upcomingEvents == null ? (
            <LoadingScreen />
          ) : (
            <>
              <DashboardCard
                color="green"
                icon="calendar"
                number={twoDigitNumber(applications.upcomingEvents.length)}
                summary="Upcoming Events"
                title="Upcoming Events"
                to="/entertainer/events"
              />
              <DashboardCard
                color="yellow"
                icon="auction"
                number={twoDigitNumber(applications.auctions.length)}
                summary="Available Auctions"
                title="Available Auction"
                to="/entertainer/available-auctions"
              />
              <DashboardCard
                color="blue"
                icon="vcard"
                number={twoDigitNumber(applications.requests.length)}
                summary="Pending Requests"
                title="Requests"
                to="/entertainer/payments"
              />
            </>
          )}
        </div>
        <div className="row">
          <div className="col-sm-8">
            <Dashboard.UpcomingEvents />
            <Dashboard.RecentBids />
          </div>
          <div className="col-sm-4">
            <Dashboard.InviteFriends />
            <Dashboard.RecentBadges />
          </div>
        </div>
      </section>
    </>
  );
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

Dashboard.UpcomingEvents = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-green">Upcoming Events</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr>
              <td className="text-white">3 days to go</td>
              <td>9:00am</td>
              <td>Mon, Apr. 17, 2019</td>
              <td>Wedding DJ</td>
              <td>Lagos</td>
            </tr>
            <tr>
              <td className="text-white">3 months to go</td>
              <td>3:00pm</td>
              <td>Sat, Dec. 3, 2019</td>
              <td>Birthday DJ</td>
              <td>Benin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.RecentBids = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-yellow">Recent Bids</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr>
              <th className="table__number" scope="row">
                01
              </th>
              <td>
                <div className="table__title text-white">Wedding Ceremony</div>
                <span>
                  <i className="icon icon-location" />
                  Yaba, Lagos state
                </span>
              </td>
              <td>
                <span className="text-red">3 days to go</span>
                <span>
                  <strong className="text-blue"> DJ Cuppy</strong> (DJ)
                </span>
              </td>
              <td className="text-right">
                <span>
                  <i className="icon icon-clock" /> Sun, April 17, 2019
                </span>
                <span>9:00am</span>
              </td>
            </tr>
            <tr>
              <th className="table__number" scope="row">
                02
              </th>
              <td>
                <div className="table__title text-white">Birthday Party</div>
                <span>
                  <i className="icon icon-location" />
                  Yaba, Lagos state
                </span>
              </td>
              <td>
                <span className="text-green">2 months to go</span>
                <span>
                  <strong className="text-blue"> High Soul</strong> (Live Band)
                </span>
              </td>
              <td className="text-right">
                <span>
                  <i className="icon icon-clock" /> Sun, April 17, 2019
                </span>
                <span>9:00am</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.PaymentHistory = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red">Payment History</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr>
              <td>17 Mar. 2019</td>
              <td className="text-white">N 50,000</td>
            </tr>
            <tr>
              <td>20 Jan. 2019</td>
              <td className="text-white">N 80,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.RecentBadges = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-blue">Recent Badges</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr valign="middle">
              <td>
                <i className="icon icon-badge text-yellow icon-sm"></i>{' '}
              </td>
              <td className="text-white pt-4">Certified Duv Entertainer</td>
            </tr>
            <tr>
              <td>
                <i className="icon icon-badge text-red icon-sm d-inline-block"></i>{' '}
              </td>
              <td className="text-white pt-4">Completed 5 events</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Dashboard;
