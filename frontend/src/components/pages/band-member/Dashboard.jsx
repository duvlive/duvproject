import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DashboardCard from 'components/common/utils/DashboardCard';

const Dashboard = () => {
  return (
    <BackEndPage title="Dashboard">
      <div className="main-app">
        <Dashboard.Items />
      </div>
    </BackEndPage>
  );
};

Dashboard.Items = () => {
  return (
    <>
      <TopMessage message="Welcome back High Soul," />
      <section className="app-content">
        <div className="row">
          <DashboardCard
            color="yellow"
            icon="auction"
            number="08"
            summary="3 applications sent"
            title="Available Auction"
            to="/entertainer/auctions"
          />
          <DashboardCard
            color="green"
            icon="calendar"
            number="81"
            summary="5 upcoming events"
            title="Total Events"
            to="/entertainer/events"
          />
          <DashboardCard
            color="blue"
            icon="credit-card"
            number="79"
            summary="2 pending payments"
            title="Payments Received"
            to="/entertainer/payments"
          />
        </div>
        <div className="row">
          <div className="col-sm-8">
            <Dashboard.UpcomingEvents />
            <Dashboard.RecentBids />
          </div>
          <div className="col-sm-4">
            <Dashboard.PaymentHistory />
            <Dashboard.RecentBadges />
          </div>
        </div>
      </section>
    </>
  );
};

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
              <td className="text-white">PAID</td>
            </tr>
            <tr>
              <td>20 Jan. 2019</td>
              <td className="text-white">PAID</td>
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
