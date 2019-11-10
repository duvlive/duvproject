import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';

const EntertainersPayment = () => (
  <BackEndPage title="Entertainers Payment">
    <div className="main-app">
      <TopMessage message="Entertainers Payment" />

      <section className="app-content">
        <div className="table-responsive">
          <table className="table table-dark">
            <tbody>
              <tr>
                <th>S/N</th>
                <th>Entertainer</th>
                <th>Amount</th>
                <th>Event</th>
                <th>Location</th>
                <th>Event Date</th>
                <th>Payment Date</th>
              </tr>
              <tr>
                <td>01.</td>
                <td>DJ Proton</td>
                <td>120,000</td>
                <td>DJ Party</td>
                <td>Lagos State</td>
                <td>15 Oct, 2019</td>
                <td>19 Oct, 2019</td>
              </tr>
              <tr>
                <td>02.</td>
                <td>DJ Proton</td>
                <td>120,000</td>
                <td>DJ Party</td>
                <td>Lagos State</td>
                <td>15 Oct, 2019</td>
                <td>19 Oct, 2019</td>
              </tr>
              <tr>
                <td>03.</td>
                <td>DJ Proton</td>
                <td>120,000</td>
                <td>DJ Party</td>
                <td>Lagos State</td>
                <td>15 Oct, 2019</td>
                <td>19 Oct, 2019</td>
              </tr>
              <tr>
                <td>04.</td>
                <td>DJ Proton</td>
                <td>120,000</td>
                <td>DJ Party</td>
                <td>Lagos State</td>
                <td>15 Oct, 2019</td>
                <td>19 Oct, 2019</td>
              </tr>
              <tr>
                <td>05.</td>
                <td>DJ Proton</td>
                <td>120,000</td>
                <td>DJ Party</td>
                <td>Lagos State</td>
                <td>15 Oct, 2019</td>
                <td>19 Oct, 2019</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </BackEndPage>
);

export default EntertainersPayment;
