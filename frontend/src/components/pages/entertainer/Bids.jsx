import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';

const Bids = () => (
  <BackEndPage title="Bids">
    <div className="main-app">
      <TopMessage message="Bids" />

      <section className="app-content">
        <div className="table-responsive">
          <table className="table table-dark table__no-border table__with-bg">
            <tbody>
              <tr>
                <th className="table__number" scope="row">
                  01
                </th>
                <td>
                  <div className="table__title text-white">
                    Wedding Ceremony
                  </div>
                  <span>
                    <i className="icon icon-location" />
                    Yaba, Lagos state
                  </span>
                </td>
                <td>
                  <span className="text-red">17 applications</span>
                  <span>DJs</span>
                </td>
                <td>
                  <span className="text-yellow">Bidding closes on </span>
                  <span>
                    <i className="icon icon-clock" /> Sun, April 17, 2019
                  </span>
                </td>
                <td className="text-right">
                  <div className="btn btn-success btn-transparent">
                    Approved
                  </div>
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
                  <span className="text-green">15 applications</span>
                  <span>DJs</span>
                </td>
                <td>
                  <span className="text-yellow">Bidding closes on </span>
                  <span>
                    <i className="icon icon-clock" /> Sun, April 17, 2019
                  </span>
                </td>
                <td className="text-right">
                  <div className="btn btn-info btn-transparent">Pending</div>
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
                  <span className="text-green">15 applications</span>
                  <span>DJs</span>
                </td>
                <td>
                  <span className="text-yellow">Bidding closes on </span>
                  <span>
                    <i className="icon icon-clock" /> Sun, April 17, 2019
                  </span>
                </td>
                <td className="text-right">
                  <div className="btn btn-danger btn-transparent">Rejected</div>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </div>
      </section>
    </div>
  </BackEndPage>
);

export default Bids;
