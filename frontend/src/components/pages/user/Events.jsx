import React from 'react';
import TopMessage from 'components/common/TopMessage';
import Avatars from 'components/common/Avatars';
import { Link } from '@reach/router';
import { getItems } from 'utils/helpers';
import djLists from 'data/entertainers/djs';
import Timeago from 'react-timeago';

const Events = () => (
  <div className="main-app">
    <TopMessage message="Upcoming Events" />

    <section className="app-content">
      <h4 className="main-app__subtitle">
        <Timeago date="Aug 29, 2014" />
      </h4>
      <div className="table-responsive">
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            <tr>
              <td className="pl-4">
                <span className="subtitle--2 text-red text-uppercase">
                  APR. 11 (SUN)
                </span>
                <span className="small--3 text-gray">9:00am - 4:00pm</span>
              </td>
              <td>
                <div className="table__title text-white">Wedding Ceremony</div>
                <span>
                  <i className="icon icon-location" />
                  Yaba, Lagos state
                </span>
              </td>
              <td>
                <span className="text-yellow">DJ, Live Band</span>
                <span>DJ Cuppy, High Soul</span>
              </td>
              <td className="text-right pr-5">
                <Avatars entertainers={getItems(djLists, 2)} />
              </td>
              <td className="text-right">
                <Link
                  className="btn btn-info btn-transparent"
                  to="/user/events/1"
                >
                  View Event
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
);

export default Events;
