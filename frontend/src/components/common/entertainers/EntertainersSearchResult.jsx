import React from 'react';
import PropTypes from 'prop-types';
import Stars from 'components/common/utils/Stars';
import bids from 'data/events/bids';
// import DuvLiveModal from 'components/custom/Modal';
import Image from 'components/common/utils/Image';

const EntertainersSearchResult = () => (
  <section className="entertainerssearchresult col-md-9">
    <div className="pl-3">
      <h4 className="main-app__subtitle">3 entertainers found</h4>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-dark table__no-border table__with-bg">
            <tbody>
              <EntertainersSearchResult.Card {...bids[0]} />
              <EntertainersSearchResult.Card {...bids[1]} />
              <EntertainersSearchResult.Card {...bids[2]} />
              <EntertainersSearchResult.Card {...bids[3]} />
              <EntertainersSearchResult.Card {...bids[4]} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);

EntertainersSearchResult.Card = ({ price, entertainer, cardsPerRow }) => (
  <tr>
    {/* <th className="table__number" scope="row">
      {twoDigitNumber(number)}
    </th> */}
    <td>
      <Image
        className="avatar--medium-small"
        name={entertainer.stageName || 'No name'}
        responsiveImage={false}
        src={entertainer.img.profile || 'No src'}
      />
    </td>
    <td>
      <span className="text-muted small--4">Stage name</span>{' '}
      {entertainer.stageName}
    </td>
    <td>
      <span className="text-muted small--4">Ratings</span>{' '}
      <Stars
        name={entertainer.stageName}
        rating={entertainer.ratings.average}
      />
    </td>
    <td className="align-middle text-gray">
      <span className="text-muted small--4">Location</span>{' '}
      {entertainer.location}
    </td>
  </tr>
);

EntertainersSearchResult.Card.propTypes = {
  entertainer: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired
};

export default EntertainersSearchResult;
