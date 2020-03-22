import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';

const BandMembers = () => (
  <BackEndPage title="Band Members">
    <div className="main-app">
      <TopMessage message="4 Band Members" />

      <section className="app-content">
        <div className="table-responsive">
          <table className="table table-dark table__no-border table__with-bg">
            <tbody>
              <BandMembers.Card
                date="Mon, April 17, 2019"
                name="Baba Dee"
                number="01"
                position="Lead Singer"
                verified
              />
              <BandMembers.Card
                date="Mon, April 17, 2019"
                name="Sure Boy"
                number="02"
                position="Guitarist"
                verified={false}
              />
              <BandMembers.Card
                date="Mon, April 17, 2019"
                name="Sugar Craze"
                number="03"
                position="Violinist"
                verified
              />
              <BandMembers.Card
                date="Mon, April 17, 2019"
                name="Not Aclown"
                number="04"
                position="drummer"
                verified
              />
            </tbody>
          </table>
          <br />
          <br />
        </div>
      </section>
    </div>
  </BackEndPage>
);

BandMembers.Card = ({ number, name, position, verified, date }) => (
  <tr>
    <th className="table__number" scope="row">
      {number}
    </th>
    <td>
      <div className="table__title text-white">{name}</div>
    </td>
    <td>
      <span className="text-blue-100">{position}</span>
    </td>
    <td>
      {verified ? (
        <span className="text-green"> Verified Member </span>
      ) : (
        <span className="text-red text-uppercase">Not Verified </span>
      )}
    </td>
    <td className="text-right">
      <span>
        <i className="icon icon-clock" /> Sun, April 17, 2019
      </span>
    </td>
  </tr>
);

BandMembers.Card.propTypes = {
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  verified: PropTypes.string.isRequired
};

export default BandMembers;
