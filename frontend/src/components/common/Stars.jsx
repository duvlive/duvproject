import React from 'react';
import PropTypes from 'prop-types';

const Stars = ({ rating }) => (
  <div className="star-rating star-rating--size">
    {Array(Math.floor(rating)).fill(<FullStar />)}
    {rating - Math.floor(rating) === 0 ? '' : <HalfStar />}
    {Array(5 - Math.ceil(rating)).fill(<EmptyStar />)}
  </div>
);

Stars.propTypes = {
  rating: PropTypes.number
};

Stars.defaultProps = {
  rating: 0
};
const FullStar = () => <span className="icon icon-star" />;
const HalfStar = () => <span className="icon icon-star-half-empty" />;
const EmptyStar = () => <span className="icon icon-star-empty" />;

export default Stars;
