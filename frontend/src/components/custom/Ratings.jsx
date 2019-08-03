import React from 'react';
import PropTypes from 'prop-types';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Stars from 'components/common/utils/Stars';

const Rating = props => (
  <Rater {...props}>
    <Star />
  </Rater>
);

const Star = props => {
  const starProps = Object.assign({}, props);
  const nameMap = {
    isDisabled: 'text-muted',
    isActive: 'text-red',
    isActiveHalf: 'text-yellow',
    willBeActive: 'text-green'
  };

  const className = Object.keys(nameMap)
    // eslint-disable-next-line
    .filter(prop => (delete starProps[prop], props[prop]))
    .map(prop => nameMap[prop])
    .join(' ');
  return (
    <div className={`${className}`} {...starProps}>
      <Stars.Full />
    </div>
  );
};

Star.defaultProps = {
  willBeActive: false,
  isActive: false,
  isActiveHalf: false,
  isDisabled: false
};

Star.propTypes = {
  isActive: PropTypes.bool,
  isActiveHalf: PropTypes.bool,
  isDisabled: PropTypes.bool,
  willBeActive: PropTypes.bool
};

export default Rating;
