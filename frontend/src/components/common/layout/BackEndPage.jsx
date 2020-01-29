import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Sidebar from 'components/common/layout/Sidebar';
import LandingSection from 'components/common/layout/LandingSection';
import { UserContext } from 'context/UserContext';

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

  const { userState } = React.useContext(UserContext);
  // CHECK IF USER HAS PREVIOUSLY SIGNED IN
  React.useEffect(() => {
    if (!(userState && userState.isLoggedIn)) {
      navigate(`/login`);
    }
  }, [userState]);

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
