import React from 'react';
import PropTypes from 'prop-types';
import Stars from 'components/common/utils/Stars';
import bids from 'data/events/bids';
import DuvLiveModal from 'components/custom/Modal';
import Image from 'components/common/utils/Image';

const EntertainersSearchResult = ({ col, cardsPerRow }) => (
  <section className={`entertainerssearchresult col-md-${col}`}>
    <h4 className="main-app__subtitle">Search Result</h4>
    <div className="row">
      <EntertainersSearchResult.Card cardsPerRow={cardsPerRow} {...bids[0]} />
      <EntertainersSearchResult.Card cardsPerRow={cardsPerRow} {...bids[1]} />
      <EntertainersSearchResult.Card cardsPerRow={cardsPerRow} {...bids[2]} />
      <EntertainersSearchResult.Card cardsPerRow={cardsPerRow} {...bids[3]} />
      <EntertainersSearchResult.Card cardsPerRow={cardsPerRow} {...bids[4]} />
    </div>
  </section>
);

EntertainersSearchResult.defaultProps = {
  col: 8,
  cardsPerRow: 2
};

EntertainersSearchResult.propTypes = {
  cardsPerRow: PropTypes.number,
  col: PropTypes.number
};

EntertainersSearchResult.Card = ({ price, entertainer, cardsPerRow }) => (
  <div className={`col-sm-${12 / cardsPerRow}`}>
    <div className="card card-custom card-tiles card-blue text-center">
      <div className="card-body">
        <Image
          className="avatar--large"
          name={entertainer.stage_name}
          src={entertainer.img.profile}
        />
        <div className="card-subtitle card-subtitle--3 mt-2 mb-0 gray">
          {entertainer.stage_name}
        </div>
        <Stars
          name={entertainer.stage_name}
          rating={entertainer.ratings.average}
        />
        <h4 className="card-subtitle--1 white mt-4 mb-0">N{price}</h4>
      </div>
      <div className="card-footer">
        <DuvLiveModal.ViewEntertainerProfile entertainer={entertainer} />
        &nbsp; &nbsp;
        <button className="btn btn-success btn-sm btn-transparent">
          Select Entertainer
        </button>
      </div>
    </div>
  </div>
);

EntertainersSearchResult.Card.propTypes = {
  cardsPerRow: PropTypes.number.isRequired,
  entertainer: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired
};

export default EntertainersSearchResult;
