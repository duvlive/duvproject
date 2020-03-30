import React from 'react';
import PropTypes from 'prop-types';
import WhiteLogo from 'assets/img/logo/white-white-logo-only.svg';

const LoadingScreen = ({ children, loading, text }) => {
  return loading ? (
    <section className="loading-screen text-center col-12">
      <img
        alt="Duv Live White Logo"
        className="animated-logo"
        src={WhiteLogo}
      />
      <h4 className="loading-text">{text}...</h4>
    </section>
  ) : (
    children
  );
};

LoadingScreen.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string
};

LoadingScreen.defaultProps = {
  text: 'Loading',
  children: null
};

export default LoadingScreen;
