import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Link } from '@reach/router';

const Events = () => (
  <BackEndPage title="All Events">
    <div className="main-app">
      <TopMessage message="All Events" />

      <section className="app-content">
        <div className="table-responsive">
          <table className="table table-dark">
            <tbody>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Organizer</th>
                <th>Location</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Time</th>
                <th></th>
              </tr>
              <tr>
                <td>01.</td>
                <td>Party on the roof</td>
                <td>Party Hub</td>
                <td>Lagos</td>
                <td>Sheraton Hotel</td>
                <td>15 Oct. 2019</td>
                <td>10am</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>02.</td>
                <td>Party on the roof</td>
                <td>Party Hub</td>
                <td>Lagos</td>
                <td>Sheraton Hotel</td>
                <td>15 Oct. 2019</td>
                <td>10am</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>03.</td>
                <td>Party on the roof</td>
                <td>Party Hub</td>
                <td>Lagos</td>
                <td>Sheraton Hotel</td>
                <td>15 Oct. 2019</td>
                <td>10am</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </BackEndPage>
);

export default Events;
