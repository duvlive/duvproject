import React from 'react';
import PropTypes from 'prop-types';
import LoadingScreen from '../layout/LoadingScreen';

const LoadItems = ({ items, children, noContent }) => {
  if (items == null) {
    return <LoadingScreen />;
  }
  if (items.length > 0) {
    return children;
  }

  return noContent;
};

LoadItems.propTypes = {
  children: PropTypes.any.isRequired,
  items: PropTypes.array.isRequired,
  noContent: PropTypes.any.isRequired,
};

export default LoadItems;
