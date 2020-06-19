import React from 'react';
import PropTypes from 'prop-types';
import RedLogo from 'assets/img/logo/red-white.svg';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, Match } from '@reach/router';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  userSideMenu,
  pseudoEntertainerUserSideMenu,
  pseudoBandMemberUserSideMenu,
  pseudoAdminUserSideMenu,
} from 'data/menu/user';
import {
  entertainerSideMenu,
  liveBandSideMenu,
  unApprovedEntertainerSideMenu,
} from 'data/menu/entertainer';
import bandMemberSideMenu from 'data/menu/band-member';
import administratorSideMenu from 'data/menu/administrator';
import classNames from 'classnames';
import { USER_TYPES, ENTERTAINER } from 'utils/constants';
import { UserContext } from 'context/UserContext';
import { getUserTypeFromStore } from 'utils/localStorage';
import { getProfileName } from 'utils/helpers';

const SIDE_MENU = {
  [USER_TYPES.user]: userSideMenu,
  [USER_TYPES.entertainer]: entertainerSideMenu,
  [USER_TYPES.admin]: administratorSideMenu,
  [USER_TYPES.bandMember]: bandMemberSideMenu,
};

const PSEUDO_SIDE_MENU = {
  [USER_TYPES.entertainer]: pseudoEntertainerUserSideMenu,
  [USER_TYPES.admin]: pseudoAdminUserSideMenu,
  [USER_TYPES.bandMember]: pseudoBandMemberUserSideMenu,
};

const Sidebar = ({ showSidebar, closeSidebar, ...props }) => {
  const { userState } = React.useContext(UserContext);
  const currentUserType = userState.type || getUserTypeFromStore();

  const UnapprovedEntertainer =
    currentUserType === USER_TYPES.entertainer &&
    userState.entertainerProfile &&
    !userState.entertainerProfile.approved;

  const LiveBandEntertainer =
    currentUserType === USER_TYPES.entertainer &&
    userState.entertainerProfile.entertainerType === ENTERTAINER.LIVEBAND;

  const sideMenu = UnapprovedEntertainer
    ? unApprovedEntertainerSideMenu
    : LiveBandEntertainer // if liveband
    ? liveBandSideMenu
    : SIDE_MENU[currentUserType];

  return (
    <>
      <div
        className={classNames('backdrop', {
          showSidebar,
        })}
        onClick={closeSidebar}
      />
      <aside
        className={classNames('sidebar', {
          showSidebar,
        })}
      >
        <div className="sidebar__logo">
          {/* For some reasons, using Link to homepage causes the page to freeze */}
          <a href="/">
            <img alt="Duv Live Red-White Logo" src={RedLogo} />
          </a>
          <div className="sidebar__close" onClick={closeSidebar}>
            <button
              aria-label="Close"
              className="close d-block d-sm-none"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <PerfectScrollbar style={{ height: 'calc(100% - 12rem)' }}>
          <Match path="/user/*">
            {(props) =>
              // eslint-disable-next-line react/prop-types
              props.match && currentUserType !== USER_TYPES.user ? (
                <>
                  <SidebarMenu showUserType={false} />
                  <Sidebar.Navigation
                    closeSidebar={closeSidebar}
                    menus={PSEUDO_SIDE_MENU[currentUserType]}
                  />
                </>
              ) : (
                <>
                  <SidebarMenu />
                  <Sidebar.Navigation
                    closeSidebar={closeSidebar}
                    menus={sideMenu}
                  />
                </>
              )
            }
          </Match>
          <div className="text-center d-block d-sm-none" onClick={closeSidebar}>
            Close Menu
          </div>
        </PerfectScrollbar>
        <div className="clearfix" />
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired,
};

const SidebarMenu = ({ showUserType }) => {
  let { userState } = React.useContext(UserContext);
  const userName = showUserType
    ? getProfileName({
        firstName: userState.firstName,
        lastName: userState.lastName,
        stageName:
          userState.entertainerProfile && userState.entertainerProfile.stageName
            ? userState.entertainerProfile.stageName
            : null,
      })
    : userState.firstName + ' ' + userState.lastName;

  // userType for user is not shown on the sidebar
  const userType =
    userState.type !== USER_TYPES.user &&
    Object.keys(USER_TYPES)[userState.type];

  // if available,show the entertainer type for entertainers
  const entertainerType =
    userState.type === USER_TYPES.entertainer &&
    userState.entertainerProfile &&
    userState.entertainerProfile.entertainerType;
  return (
    <div className="user-box">
      <div className="user-img">
        <img
          alt={userName}
          className="rounded-circle img-thumbnail img-responsive"
          src={userState.profileImg || ProfileAvatar}
          title={userName}
        />
        <div className="user-status offline" />
      </div>
      <h5 className="text-uppercase">{userName}</h5>
      {showUserType && (
        <small className="text-uppercase">{entertainerType || userType}</small>
      )}
    </div>
  );
};

SidebarMenu.propTypes = {
  showUserType: PropTypes.bool,
};

SidebarMenu.defaultProps = {
  showUserType: true,
};

Sidebar.Navigation = ({ menus, closeSidebar }) => {
  const sideMenu =
    menus &&
    menus.map(({ name, menus }) => (
      <ul className="sidebar-menu" key={name}>
        <h6 className="sidebar-menu__header">{name}</h6>
        {menus.map(({ title, to, icon }) => (
          <li key={title}>
            <Link getProps={isActive} onClick={closeSidebar} to={to}>
              <i className={`icon icon-${icon}`} />
              {title}
            </Link>
          </li>
        ))}
      </ul>
    ));
  return <div>{sideMenu}</div>;
};

Sidebar.Navigation.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
};

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active' } : null;
};

export default Sidebar;
