import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DashboardCard from 'components/common/utils/DashboardCard';
import { Link } from '@reach/router';

const Dashboard = () => (
  <BackEndPage title="Dashboard">
    <div className="main-app">
      <Dashboard.Items />
    </div>
  </BackEndPage>
);

Dashboard.Items = () => {
  return (
    <>
      <TopMessage message="Welcome back U.V," />
      <section className="app-content">
        <div className="row">
          <DashboardCard
            color="yellow"
            icon="auction"
            number="08"
            summary="31 in last 30days"
            title="Total Auctions"
            to="/administrator/auctions"
          />
          <DashboardCard
            color="green"
            icon="calendar"
            number="81"
            summary="15 upcoming events"
            title="Total Events"
            to="/administrator/events"
          />
          <DashboardCard
            color="blue"
            icon="credit-card"
            number="79"
            summary="2 pending payments"
            title="Payments Received"
            to="/administrator/payments"
          />
          <DashboardCard
            color="yellow"
            icon="entertainers"
            number="108"
            summary="15 in last 30days"
            title="All Entertainers"
            to="/administrator/entertainers"
          />
          <DashboardCard
            color="green"
            icon="users"
            number="123"
            summary="22 in last 30 days"
            title="All Users"
            to="/administrator/events"
          />
          <DashboardCard
            color="blue"
            icon="circle"
            number="19"
            summary="7 pending payments"
            title="Payments Made"
            to="/administrator/payments"
          />
        </div>

        <div className="row">
          <div className="col-sm-8">
            <Dashboard.UpcomingEvents />
            <Dashboard.RecentBids />
          </div>
          <div className="col-sm-4">
            <Dashboard.RecentPaymentsMade />
            <Dashboard.RecentBadges />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <Dashboard.DuePayments />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <Dashboard.RecentEntertainers />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <Dashboard.RecentUsers />
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

Dashboard.RecentPaymentsMade = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red">Recent Payments</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr>
              <td> YUMMY BAND</td>
              <td className="text-white">N 50,000</td>
            </tr>
            <tr>
              <td>DJ CUPPY</td>
              <td className="text-white">N 150,000</td>
            </tr>
            <tr>
              <td>GAGALO</td>
              <td className="text-white">N 75,000</td>
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
              <td className="text-white pt-4">Certified Duv Administrator</td>
            </tr>
            <tr>
              <td>
                <i className="icon icon-badge text-red icon-sm d-inline-block"></i>{' '}
              </td>
              <td className="text-white pt-4">Completed 5 events</td>
            </tr>
            <tr>
              <td>
                <i className="icon icon-badge text-blue icon-sm d-inline-block"></i>{' '}
              </td>
              <td className="text-white pt-4">D.U.V Live AllStar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.DuePayments = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-white">Due Payments</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Type</th>
              <th>Location</th>
              <th>Due Date</th>
            </tr>
            <tr>
              <td>01.</td>
              <td>DJ Gold</td>
              <td>50,000</td>
              <td>Apr 03, 2019</td>
              <td>Wedding DJ</td>
              <td>Lagos State</td>
              <td>Last 3 days</td>
            </tr>
            <tr>
              <td>02.</td>
              <td>NotJustOK</td>
              <td>150,000</td>
              <td>Apr 03, 2019</td>
              <td>Live Band</td>
              <td>Lagos State</td>
              <td>Today</td>
            </tr>
            <tr>
              <td>03.</td>
              <td>Moses Afaghon</td>
              <td>80,000</td>
              <td>Apr 03, 2019</td>
              <td>MC</td>
              <td>Port Harcourt</td>
              <td>Tomorrow</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.RecentEntertainers = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red">Recent Entertainers</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Stage Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Verified</th>
              <th></th>
            </tr>
            <tr>
              <td>01.</td>
              <td>Olawale Adebisi</td>
              <td>DJ Proton</td>
              <td>DJ</td>
              <td>Lagos State</td>
              <td>NO</td>
              <td>
                <Link to="#">Manage</Link>
              </td>
            </tr>
            <tr>
              <td>02.</td>
              <td>Precious Jewel</td>
              <td>Holy Guys</td>
              <td>Live Band</td>
              <td>Lagos State</td>
              <td>NO</td>
              <td>
                <Link to="#">Manage</Link>
              </td>
            </tr>
            <tr>
              <td>03.</td>
              <td>Olawale Adebisi</td>
              <td>Sweet Mouth</td>
              <td>MC</td>
              <td>Port Harcourt</td>
              <td>YES</td>
              <td>
                <Link to="#">Manage</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.RecentUsers = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-blue">Recent Users</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Stage Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Verified</th>
              <th></th>
            </tr>
            <tr>
              <td>01.</td>
              <td>Olawale Adebisi</td>
              <td>DJ Proton</td>
              <td>DJ</td>
              <td>Lagos State</td>
              <td>NO</td>
              <td>
                <Link to="#">Manage</Link>
              </td>
            </tr>
            <tr>
              <td>02.</td>
              <td>Precious Jewel</td>
              <td>Holy Guys</td>
              <td>Live Band</td>
              <td>Lagos State</td>
              <td>NO</td>
              <td>
                <Link to="#">Manage</Link>
              </td>
            </tr>
            <tr>
              <td>03.</td>
              <td>Olawale Adebisi</td>
              <td>Sweet Mouth</td>
              <td>MC</td>
              <td>Port Harcourt</td>
              <td>YES</td>
              <td>
                <Link to="#">Manage</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Dashboard;
