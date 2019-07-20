import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'components/common/Sidebar';
import LandingSection from 'components/common/LandingSection';

const BackEndPage = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div className="content-page">
        <LandingSection />
        {children}
      </div>
    </div>
  );
};

BackEndPage.propTypes = {
  children: PropTypes.node.isRequired
};

export default BackEndPage;
