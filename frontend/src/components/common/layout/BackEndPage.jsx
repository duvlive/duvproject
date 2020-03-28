import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Sidebar from 'components/common/layout/Sidebar';
import LandingSection from 'components/common/layout/LandingSection';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import LoadingScreen from './LoadingScreen';

const BackEndPage = ({ children, title, loading, subtitle }) => {
  let { userDispatch } = React.useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const closeSidebar = () => {
    document.body.classList.remove('modal-open');
    setShowSidebar(false);
  };
  const openSidebar = () => {
    document.body.classList.add('modal-open');
    setShowSidebar(true);
  };

  // CHECK IF USER HAS PREVIOUSLY SIGNED IN
  React.useEffect(() => {
    if (!getTokenFromStore()) {
      userDispatch({
        type: 'no-token'
      });
      navigate(`/login`);
    }
  }, [userDispatch]);

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

        {loading ? <LoadingScreen /> : children}
      </div>
    </div>
  );
};

BackEndPage.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

BackEndPage.defaultProps = {
  loading: false,
  subtitle: null
};

export default BackEndPage;
