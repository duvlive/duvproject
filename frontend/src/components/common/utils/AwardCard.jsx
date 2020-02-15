import React from 'react';
import PropTypes from 'prop-types';

const AwardCard = ({ title, color, date }) => (
  <div className="col-lg-3 col-md-4 col-6">
    <div className={`card card-custom card-tiles card-${color} card__no-hover`}>
      <div className="text-center">
        <i className="icon icon-xl icon-badge"></i>
      </div>
      <div className="card-body m-0 fh-3 text-center">
        <h4 className="subtitle--4 text-white mb-1">{title}</h4>
        <div className="small--3 text-gray">{date}</div>
      </div>
    </div>
  </div>
);

AwardCard.propTypes = {
  color: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default AwardCard;
