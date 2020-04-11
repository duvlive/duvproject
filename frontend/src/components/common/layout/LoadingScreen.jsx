import React from 'react';
import PropTypes from 'prop-types';
import WhiteLogo from 'assets/img/logo/white-white-logo-only.svg';

const LoadingScreen = ({ children, loading, text }) => {
  return loading ? (
    <span className="loading-screen d-block text-center col-12">
      <img
        alt="Duv Live White Logo"
        className="animated-logo"
        src={WhiteLogo}
      />
      {text && <h4 className="loading-text">{text}...</h4>}
    </span>
  ) : (
    children
  );
};

LoadingScreen.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  text: PropTypes.string,
};

LoadingScreen.defaultProps = {
  loading: true,
  text: null,
  children: null,
};

export default LoadingScreen;
