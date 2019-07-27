import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'components/common/Sidebar';
import LandingSection from 'components/common/LandingSection';

const BackEndPage = ({ children, title, subtitle }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const closeSidebar = () => {
    document.body.classList.remove('modal-open');
    setShowSidebar(false);
  };
  const openSidebar = () => {
    document.body.classList.add('modal-open');
    setShowSidebar(true);
  };
  return (
    <div>
      <Sidebar closeSidebar={closeSidebar} showSidebar={showSidebar} />
      <div className="content-page">
        <LandingSection
          isDashboard
          showSidebar={openSidebar}
          subtitle={subtitle}
          title={title}
        />
        {children}
      </div>
    </div>
  );
};

BackEndPage.propTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

BackEndPage.defaultProps = {
  subtitle: null
};

export default BackEndPage;
