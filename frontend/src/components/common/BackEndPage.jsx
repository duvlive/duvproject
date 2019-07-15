import React from 'react';
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

export default BackEndPage;
