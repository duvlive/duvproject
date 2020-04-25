import React from 'react';
import PropTypes from 'prop-types';
import LoadingScreen from '../layout/LoadingScreen';

const LoadItems = ({ items, children, loadingText, noContent }) => {
  if (items == null) {
    return <LoadingScreen text={loadingText} />;
  }
  if (items.length > 0) {
    return children;
  }

  return noContent;
};

LoadItems.propTypes = {
  children: PropTypes.any,
  items: PropTypes.array,
  loadingText: PropTypes.string,
  noContent: PropTypes.any.isRequired,
};

LoadItems.defaultProps = {
  children: null,
  loadingText: null,
  items: null,
};

export default LoadItems;
