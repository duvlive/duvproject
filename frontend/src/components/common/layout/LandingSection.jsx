import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from 'components/common/layout/Header';
import Humanize from 'humanize-plus';
import TopBar from 'components/common/layout/TopBar';
import { UserContext } from 'context/UserContext';
import { USER_TYPES } from 'utils/constants';
import { Match } from '@reach/router';
import { getUserTypeFromStore } from 'utils/localStorage';

const LandingSection = ({ showSidebar, isDashboard, title, subtitle }) => {
  let { userState } = React.useContext(UserContext);
  const currentUserType = userState.type || getUserTypeFromStore();
  const userType = Object.keys(USER_TYPES)[currentUserType];
  const entertainerType = userState.entertainerProfile
    ? userState.entertainerProfile.entertainerType
    : '';

  const landingContent = (
    <div
      className={classNames(
        'card bg-dark text-white',
        {
          card__dashboard: isDashboard,
        },
        {
          card__menu: !isDashboard,
        }
      )}
    >
      {isDashboard ? <TopBar showSidebar={showSidebar} /> : <Header />}
      <div className="card-img-overlay">
        <div className="card-img-overlay__content">
          <h2 className="card-title">{title && Humanize.capitalize(title)}</h2>
          {!isDashboard && (
            <p className="card-subtitle">
              DUV LIVE &nbsp;/ &nbsp;{subtitle || title}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Match path="/user/*">
      {(props) =>
        // eslint-disable-next-line react/prop-types
        props.match && currentUserType !== USER_TYPES.user ? (
          <section className={`landing`}>{landingContent}</section>
        ) : (
          <section className={`landing ${userType} ${entertainerType}`}>
            {landingContent}
          </section>
        )
      }
    </Match>
  );
};

LandingSection.propTypes = {
  isDashboard: PropTypes.bool,
  showSidebar: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

LandingSection.defaultProps = {
  isDashboard: false,
  subtitle: null,
  showSidebar: () => {},
};
export default LandingSection;
