import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import Avatars from 'components/common/utils/Avatars';
import { Link } from '@reach/router';
import { getItems } from 'utils/helpers';
import djLists from 'data/entertainers/djs';
import mcLists from 'data/entertainers/mcs';
import BackEndPage from 'components/common/layout/BackEndPage';

const Auctions = () => (
  <BackEndPage title="Auctions">
    <div className="main-app">
      <TopMessage message="Auctions" />

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
                  <Avatars entertainers={getItems(djLists, 3)} others={14} />
                </td>
                <td>
                  <span className="text-yellow">Bidding closes on </span>
                  <span>
                    <i className="icon icon-clock" /> Sun, April 17, 2019
                  </span>
                </td>
                <td className="text-right">
                  <Link
                    className="btn btn-info btn-transparent"
                    to="/user/auction/bids"
                  >
                    View Bids
                  </Link>
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
                  <span>MCs</span>
                </td>
                <td>
                  <Avatars entertainers={getItems(mcLists, 3)} others={12} />
                </td>
                <td>
                  <span className="text-yellow">Bidding closes on </span>
                  <span>
                    <i className="icon icon-clock" /> Sun, April 17, 2019
                  </span>
                </td>
                <td className="text-right">
                  <Link
                    className="btn btn-info btn-transparent"
                    to="/user/auction/bids"
                  >
                    View Bids
                  </Link>
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

export default Auctions;
