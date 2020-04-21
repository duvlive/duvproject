import React from 'react';
import PropTypes from 'prop-types';
import LoadingScreen from '../layout/LoadingScreen';

const LoadItems = ({ items, children, loadingText, noContent }) => {
  console.log('items', items);
  if (items == null) {
    return <LoadingScreen text={loadingText} />;
  }
  if (items.length > 0) {
    return children;
  }

  return noContent;
};

LoadItems.propTypes = {
  children: PropTypes.any.isRequired,
  items: PropTypes.array.isRequired,
  loadingText: PropTypes.string,
  noContent: PropTypes.any.isRequired,
};

LoadItems.defaultProps = {
  loadingText: null,
};

export default LoadItems;
