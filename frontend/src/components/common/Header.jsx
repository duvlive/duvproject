import React, { useState } from 'react';
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
import classNames from 'classnames';

const menus = [
  { name: 'Home', to: '/' },
  { name: 'How it Works', to: '/how-it-works' },
  { name: 'Hire Entertainers', to: '/hire-entertainers' },
  { name: 'Upcoming Events', to: '/upcoming-events' },
  { name: 'Help', to: '/help' }
];

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <header>
      <Header.TopNav />
      <div className="container-fluid">
        <Navbar color="transparent" expand="md">
          <NavbarBrand tag={Link} to="/">
            <img alt="Duv Live White Logo" height="75" src={WhiteLogo} />
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

Header.TopNav = () => {
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
          <div className="top-header__right text-right col-6">
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link to="/login">Login </Link>
              </li>
              <li className="list-inline-item">
                <a href="/">Register Now</a>
              </li>
            </ul>
          </div>
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
