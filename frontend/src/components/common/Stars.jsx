import React from 'react';
import PropTypes from 'prop-types';

const Stars = ({ rating, name }) => (
  <div className="star-rating star-rating--size">
    {[...Array(Math.floor(rating))].map((_, i) => (
      <FullStar key={`${name}-star-${i}`} />
    ))}
    {rating - Math.floor(rating) === 0 ? (
      ''
    ) : (
      <HalfStar key={`${name}-half-star`} />
    )}
    {[...Array(5 - Math.ceil(rating))].map((_, i) => (
      <EmptyStar key={`${name}-star-${i}`} />
    ))}
  </div>
);

Stars.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number
};

Stars.defaultProps = {
  rating: 0
};
const FullStar = () => <span className="icon icon-star" />;
const HalfStar = () => <span className="icon icon-star-half-empty" />;
const EmptyStar = () => <span className="icon icon-star-empty" />;

export default Stars;
