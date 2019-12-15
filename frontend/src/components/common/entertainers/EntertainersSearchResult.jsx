import React from 'react';
import PropTypes from 'prop-types';
import Stars from 'components/common/utils/Stars';
import bids from 'data/events/bids';
import DuvLiveModal from 'components/custom/Modal';
import Image from 'components/common/utils/Image';

const EntertainersSearchResult = ({ col }) => (
  <section className={`entertainerssearchresult col-md-${col}`}>
    <h4 className="main-app__subtitle">Search Result</h4>
    <div className="row">
      <EntertainersSearchResult.Card {...bids[0]} />
      <EntertainersSearchResult.Card {...bids[1]} />
      <EntertainersSearchResult.Card {...bids[2]} />
      <EntertainersSearchResult.Card {...bids[3]} />
      <EntertainersSearchResult.Card {...bids[4]} />
    </div>
  </section>
);

EntertainersSearchResult.defaultProps = {
  col: 8
};

EntertainersSearchResult.propTypes = {
  col: PropTypes.number
};

EntertainersSearchResult.Card = ({ price, entertainer, showApproveBtn }) => (
  <div className="col-sm-6">
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
        {showApproveBtn && (
          <button className="btn btn-success btn-sm btn-transparent">
            Approve Bid
          </button>
        )}
      </div>
    </div>
  </div>
);

EntertainersSearchResult.Card.propTypes = {
  entertainer: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  showApproveBtn: PropTypes.bool.isRequired
};

export default EntertainersSearchResult;
