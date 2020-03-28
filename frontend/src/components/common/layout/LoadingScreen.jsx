import React from 'react';
import WhiteLogo from 'assets/img/logo/white-white-logo-only.svg';

const LoadingScreen = () => {
  return (
    <section className="laoding-screen text-center loading-screen">
      <img
        alt="Duv Live White Logo"
        className="animated-logo"
        src={WhiteLogo}
      />
    </section>
  );
};

export default LoadingScreen;
