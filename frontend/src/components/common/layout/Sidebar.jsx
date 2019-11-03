import React from 'react';
import PropTypes from 'prop-types';
import RedLogo from 'assets/img/logo/red-white.svg';
import UserAvatar from 'assets/img/avatar/user.png';
import EntertainerAvatar from 'assets/img/avatar/entertainer.jpg';
import BandMemberAvatar from 'assets/img/avatar/band-member.png';
import AdministratorAvatar from 'assets/img/avatar/administrator.png';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from '@reach/router';
import 'react-perfect-scrollbar/dist/css/styles.css';
import userSideMenu from 'data/sidebar/user';
import entertainerSideMenu from 'data/sidebar/entertainer';
import bandMemberSideMenu from 'data/sidebar/band-member';
import administratorSideMenu from 'data/sidebar/administrator';
import classNames from 'classnames';
import { Match } from '@reach/router';

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
      <PerfectScrollbar style={{ height: 'calc(100% - 12rem)' }}>
        {/* Entertainer */}
        <Match path="/entertainer/*">
          {props =>
            props.match ? (
              <div>
                <Sidebar.EntertainerBox />
                <Sidebar.Navigation
                  closeSidebar={closeSidebar}
                  menus={entertainerSideMenu}
                />
              </div>
            ) : null
          }
        </Match>

        {/* Band Member */}
        <Match path="/band-member/*">
          {props =>
            props.match ? (
              <div>
                <Sidebar.BandMemberBox />
                <Sidebar.Navigation
                  closeSidebar={closeSidebar}
                  menus={bandMemberSideMenu}
                />
              </div>
            ) : null
          }
        </Match>

        {/* User */}
        <Match path="/user/*">
          {props =>
            props.match ? (
              <div>
                <Sidebar.UserBox />
                <Sidebar.Navigation
                  closeSidebar={closeSidebar}
                  menus={userSideMenu}
                />
              </div>
            ) : null
          }
        </Match>

        {/* Administrator */}
        <Match path="/administrator/*">
          {props =>
            props.match ? (
              <div>
                <Sidebar.AdministratorBox />
                <Sidebar.Navigation
                  closeSidebar={closeSidebar}
                  menus={administratorSideMenu}
                />
              </div>
            ) : null
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

Sidebar.EntertainerBox = () => {
  return (
    <div className="user-box">
      <div className="user-img">
        <img
          alt="DJ Cuppy"
          className="rounded-circle img-thumbnail img-responsive"
          src={EntertainerAvatar}
          title="DJ Cuppy"
        />
        <div className="user-status offline" />
      </div>
      <h5 className="text-uppercase">DJ Cuppy</h5>
    </div>
  );
};

Sidebar.BandMemberBox = () => {
  return (
    <div className="user-box">
      <div className="user-img">
        <img
          alt="High Soul"
          className="rounded-circle img-thumbnail img-responsive"
          src={BandMemberAvatar}
          title="High Soul"
        />
        <div className="user-status offline" />
      </div>
      <h5 className="text-uppercase">High Soul</h5>
    </div>
  );
};

Sidebar.AdministratorBox = () => {
  return (
    <div className="user-box">
      <div className="user-img">
        <img
          alt="U.V"
          className="rounded-circle img-thumbnail img-responsive"
          src={AdministratorAvatar}
          title="U.V"
        />
        <div className="user-status offline" />
      </div>
      <h5 className="text-uppercase">U.V</h5>
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
  match: PropTypes.bool.isRequired,
  menus: PropTypes.array.isRequired
};

export default Sidebar;
