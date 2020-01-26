import React from 'react';
import PropTypes from 'prop-types';
import RedLogo from 'assets/img/logo/red-white.svg';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from '@reach/router';
import 'react-perfect-scrollbar/dist/css/styles.css';
import userSideMenu from 'data/menu/user';
import entertainerSideMenu from 'data/menu/entertainer';
import bandMemberSideMenu from 'data/menu/band-member';
import administratorSideMenu from 'data/menu/administrator';
import classNames from 'classnames';
import { getCurrentUser } from 'utils/localStorage';
import { getSampleUser, getSampleAvatar } from 'utils/sampleData';
import { USER_TYPES } from 'utils/constants';

const SIDE_MENU = {
  [USER_TYPES.user]: userSideMenu,
  [USER_TYPES.entertainer]: entertainerSideMenu,
  [USER_TYPES.admin]: administratorSideMenu,
  [USER_TYPES.bandMember]: bandMemberSideMenu
};

const Sidebar = ({ showSidebar, closeSidebar }) => {
  const currentUser = getCurrentUser();
  // TODO: sort out band members
  const sideMenu = SIDE_MENU[currentUser.type];
  return (
    <>
      <div
        className={classNames('backdrop', {
          showSidebar
        })}
        onClick={closeSidebar}
      />
      <aside
        className={classNames('sidebar', {
          showSidebar
        })}
      >
        <div className="sidebar__logo">
          <Link to="/">
            <img alt="Duv Live Red-White Logo" src={RedLogo} />
          </Link>
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
          <Sidebar.Menu />
          <Sidebar.Navigation closeSidebar={closeSidebar} menus={sideMenu} />
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
  showSidebar: PropTypes.bool.isRequired
};

Sidebar.Menu = () => {
  const currentUser = getCurrentUser();
  const src = currentUser.id
    ? currentUser.profileImgURL || ProfileAvatar
    : getSampleAvatar();
  const userName = currentUser.id
    ? currentUser.firstName + ' ' + currentUser.lastName
    : getSampleUser();
  return (
    <div className="user-box">
      <div className="user-img">
        <img
          alt={userName}
          className="rounded-circle img-thumbnail img-responsive"
          src={src}
          title={userName}
        />
        <div className="user-status offline" />
      </div>
      <h5 className="text-uppercase">{userName}</h5>
    </div>
  );
};

Sidebar.Navigation = ({ menus, closeSidebar }) => {
  const sideMenu = menus.map(({ name, menus }) => (
    <ul className="sidebar-menu" key={name}>
      <h6 className="sidebar-menu__header">{name}</h6>
      {menus.map(({ title, to, icon }) => (
        <li key={title}>
          <Link onClick={closeSidebar} to={to}>
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
  menus: PropTypes.array.isRequired
};

export default Sidebar;
