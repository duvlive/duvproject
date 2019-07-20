import React from 'react';
import TopMessage from 'components/common/TopMessage';

const Notifications = () => (
  <div className="main-app">
    <TopMessage message="Notifications" />

    <section className="app-content">
      <div className="table-responsive">
        <div className="table-heading">Today</div>
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            <tr>
              <th className="table__number" scope="row" width="5%">
                <span className="circle yellow" />
              </th>
              <td width="25%">
                <span className="text-white">Bid Won - Wedding DJ</span>
              </td>
              <td width="50%">
                <span className="text-yellow">
                  Yomi Oguntade approved your bid
                </span>
              </td>
              <td className="text-right" width="20%">
                <span>
                  <i className="icon icon-clock" /> Sun, April 17, 2019 at
                  4:30pm
                </span>
              </td>
            </tr>
            <tr>
              <th className="table__number" scope="row" width="5%">
                <span className="circle red" />
              </th>
              <td width="25%">
                <span className="text-white">You made a Bid</span>
              </td>
              <td width="50%">
                <span className="text-yellow">Bidded for Wedding DJ</span>
              </td>
              <td className="text-right" width="20%">
                <span>
                  <i className="icon icon-clock" /> Sun, April 17, 2019 at
                  4:30pm
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </div>
      <div className="table-responsive">
        <div className="table-heading">Yesterday</div>
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            <tr>
              <th className="table__number" scope="row" width="5%">
                <span className="circle blue" />
              </th>
              <td width="25%">
                <span className="text-white">Payment Made</span>
              </td>
              <td width="50%">
                <span className="text-yellow">
                  Paid for performing at the event as Wedding DJ
                </span>
              </td>
              <td className="text-right" width="20%">
                <span>
                  <i className="icon icon-clock" /> Sun, April 17, 2019 at
                  4:30pm
                </span>
              </td>
            </tr>
            <tr>
              <th className="table__number" scope="row" width="5%">
                <span className="circle green" />
              </th>
              <td width="25%">
                <span className="text-white">Upcoming Events - 1 week</span>
              </td>
              <td width="50%">
                <span className="text-yellow">
                  Wedding DJ @ Yaba, Lagos on Apr 15, 10.00am
                </span>
              </td>
              <td className="text-right" width="20%">
                <span>
                  <i className="icon icon-clock" /> Sun, April 17, 2019 at
                  4:30pm
                </span>
              </td>
            </tr>
            <tr>
              <th className="table__number" scope="row" width="5%">
                <span className="circle yellow" />
              </th>
              <td width="25%">
                <span className="text-white">Bid Won - Wedding DJ</span>
              </td>
              <td width="50%">
                <span className="text-yellow">
                  Yomi Oguntade approved your bid
                </span>
              </td>
              <td className="text-right" width="20%">
                <span>
                  <i className="icon icon-clock" /> Sun, April 17, 2019 at
                  4:30pm
                </span>
              </td>
            </tr>
            <tr>
              <th className="table__number" scope="row" width="5%">
                <span className="circle red" />
              </th>
              <td width="25%">
                <span className="text-white">You made a Bid</span>
              </td>
              <td width="50%">
                <span className="text-yellow">Bidded for Wedding DJ</span>
              </td>
              <td className="text-right" width="20%">
                <span>
                  <i className="icon icon-clock" /> Sun, April 17, 2019 at
                  4:30pm
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </div>
    </section>
  </div>
);

export default Notifications;
