import React from 'react';
import PropTypes from 'prop-types';

const Stars = ({ rating, name }) => {
  let value;
  value = isNaN(rating) ? 0 : rating;
  value = value > 0 ? value : 0;
  value = value < 5 ? value : 5;

  return (
    <div className="star-rating star-rating--size">
      {[...Array(Math.floor(value))].map((_, i) => (
        <FullStar key={`${name}-star-${i}`} />
      ))}
      {value - Math.floor(value) === 0 ? (
        ''
      ) : (
        <HalfStar key={`${name}-half-star`} />
      )}
      {[...Array(5 - Math.ceil(value))].map((_, i) => (
        <EmptyStar key={`${name}-star-${i}`} />
      ))}
    </div>
  );
};

Stars.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

Stars.defaultProps = {
  assignedRating: 0,
};
const FullStar = () => <span className="icon icon-star" />;
const HalfStar = () => <span className="icon icon-star-half-empty" />;
const EmptyStar = () => <span className="icon icon-star-empty" />;

Stars.Full = FullStar;

export default Stars;
