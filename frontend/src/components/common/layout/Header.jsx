import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from '@reach/router';
import IconPhone from 'assets/icons/phone.svg';
import WhiteLogo from 'assets/img/logo/white-white.svg';
import RedLogo from 'assets/img/logo/red-white.svg';
import classNames from 'classnames';
import { UserContext } from 'context/UserContext';
import ProfileAvatar from 'assets/img/avatar/profile.png';

const menus = [
  { name: 'Home', to: '/' },
  { name: 'How it Works', to: '/how-it-works' },
  { name: 'Hire Entertainers', to: '/hire-entertainers' },
  { name: 'Upcoming Events', to: '/upcoming-events' },
  { name: 'Help', to: '/help' }
];

const Header = ({ showRedLogo }) => {
  const [isOpen, setOpen] = useState(false);
  const logo = showRedLogo ? RedLogo : WhiteLogo;
  return (
    <header>
      <HeaderTopNav />
      <div className="container-fluid">
        <Navbar color="transparent" expand="md">
          <NavbarBrand tag={Link} to="/">
            <img alt="Duv Live White Logo" height="75" src={logo} />
          </NavbarBrand>
          <NavbarToggler
            className={classNames({ open: isOpen })}
            onClick={() => setOpen(!isOpen)}
          >
            <span />
            <span />
            <span />
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Header.Menus menus={menus} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </header>
  );
};

Header.propTypes = {
  showRedLogo: PropTypes.bool
};

Header.defaultProps = {
  showRedLogo: false
};

const HeaderTopNav = () => {
  const { userState } = React.useContext(UserContext);
  const Avatar = userState.profileImg || ProfileAvatar;
  const userName = userState.firstName + ' ' + userState.lastName;

  return (
    <section className="top-header">
      <div className="container-fluid">
        <div className="row">
          <div className="top-header__left col-6">
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link to="/">
                  <img
                    alt="phone icon"
                    className="top-header__icon"
                    src={IconPhone}
                  />{' '}
                  +2348 234 567 890
                </Link>
              </li>
              <li className="list-inline-item d-none d-sm-inline">
                <a href="/">info@duvlive.com</a>
              </li>
            </ul>
          </div>
          {userState.isLoggedIn ? (
            <div className="top-header__right text-right col-6">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <Link to="/user/dashboard">{userName} &nbsp;</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/user/dashboard">
                    <img
                      alt={userName}
                      className="rounded-circle img-responsive avatar--small"
                      src={Avatar}
                      title={userName}
                    />{' '}
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="top-header__right text-right col-6">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <Link to="/login">Login </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/register">Register Now </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Header.Menus = ({ menus }) => {
  return menus.map(({ name, to }) => (
    <NavItem key={name}>
      <NavLink getProps={isActive} tag={Link} to={to}>
        {name}
      </NavLink>
    </NavItem>
  ));
};

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active nav-link' } : null;
};

export default Header;
