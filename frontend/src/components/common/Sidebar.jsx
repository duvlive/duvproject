import React from 'react';
import PropTypes from 'prop-types';
import RedLogo from 'assets/img/logo/red-white.svg';
import UserAvatar from 'assets/img/avatar/user.png';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from '@reach/router';
import 'react-perfect-scrollbar/dist/css/styles.css';
import userSideMenu from 'data/sidebar/user.js';
import classNames from 'classnames';

const Sidebar = ({ showSidebar, closeSidebar }) => (
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
      <PerfectScrollbar style={{ height: 'calc(100% - 190px)' }}>
        <Sidebar.UserBox />
        <Sidebar.Navigation menus={userSideMenu} />
      </PerfectScrollbar>
      <div className="clearfix" />
    </aside>
  </>
);

Sidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired
};

Sidebar.UserBox = () => {
  return (
    <div className="user-box">
      <div className="user-img">
        <img
          alt="Mariam Obi"
          className="rounded-circle img-thumbnail img-responsive"
          src={UserAvatar}
          title="Mariam Obi"
        />
        <div className="user-status offline" />
      </div>
      <h5 className="text-uppercase">Mariam Obi</h5>
    </div>
  );
};

Sidebar.Navigation = ({ menus }) => {
  const sideMenu = menus.map(({ name, menus }) => (
    <ul className="sidebar-menu" key={name}>
      <h6 className="sidebar-menu__header">{name}</h6>
      {menus.map(({ title, to, icon }) => (
        <li key={title}>
          <Link to={to}>
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
  menus: PropTypes.array.isRequired
};

export default Sidebar;
