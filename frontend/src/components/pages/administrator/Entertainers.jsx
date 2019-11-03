import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Link } from '@reach/router';

const Entertainers = () => (
  <BackEndPage title="All Entertainers">
    <div className="main-app">
      <TopMessage message="All Entertainers" />

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
                <td>Yomi Ogunmola</td>
                <td>DJ Yummy</td>
                <td>DJ</td>
                <td>Lagos</td>
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
                <td>Lagos</td>
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
                <td>Abuja</td>
                <td>YES</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>04.</td>
                <td>Olawale Adebisi</td>
                <td>DJ Proton</td>
                <td>DJ</td>
                <td>Lagos</td>
                <td>NO</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>05.</td>
                <td>Precious Jewel</td>
                <td>Holy Guys</td>
                <td>Live Band</td>
                <td>Ogun</td>
                <td>NO</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>06.</td>
                <td>Femi Adebayo</td>
                <td>Uncle MC</td>
                <td>MC</td>
                <td>Port Harcourt</td>
                <td>YES</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>07.</td>
                <td>Olawale Adebisi</td>
                <td>DJ Proton</td>
                <td>DJ</td>
                <td>Lagos</td>
                <td>NO</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>08.</td>
                <td>Precious Jewel</td>
                <td>Holy Guys</td>
                <td>Live Band</td>
                <td>Kaduna</td>
                <td>NO</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>09.</td>
                <td>David Ogbeneghe</td>
                <td>Sweet Mouth</td>
                <td>MC</td>
                <td>Port Harcourt</td>
                <td>YES</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>10.</td>
                <td>Sister Agnes</td>
                <td>DJ Agnes</td>
                <td>DJ</td>
                <td>Oyo</td>
                <td>NO</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>11.</td>
                <td>Precious Jewel</td>
                <td>Holy Guys</td>
                <td>Live Band</td>
                <td>Lagos</td>
                <td>NO</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>12.</td>
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

export default Entertainers;
