import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Link } from '@reach/router';

const RegisteredUsers = () => (
  <BackEndPage title="Registered Users">
    <div className="main-app">
      <TopMessage message="Registered Users" />

      <section className="app-content">
        <div className="table-responsive">
          <table className="table table-dark">
            <tbody>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th></th>
              </tr>
              <tr>
                <td>01.</td>
                <td>Olawale Adebisi</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>02.</td>
                <td>Adewale Ayuba</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>03.</td>
                <td>Nnamdi Emeka</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>04.</td>
                <td>Olawale Adebisi</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>05.</td>
                <td>Adewale Ayuba</td>
                <td>
                  <Link to="#">Manage</Link>
                </td>
              </tr>
              <tr>
                <td>06.</td>
                <td>Nnamdi Emeka</td>
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

export default RegisteredUsers;
