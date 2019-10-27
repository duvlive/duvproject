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
      </section>
    </div>
  </BackEndPage>
);

export default Events;
