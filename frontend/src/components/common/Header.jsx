import React, { useState, } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link, } from '@reach/router';
import IconPhone from 'assets/icons/phone.svg';
import WhiteLogo from 'assets/logo/white-white.svg';

const menus = [
  { name: 'Home', to: '/', },
  { name: 'How it Works', to: '/how-it-works', },
  { name: 'Hire Entertainers', to: '/hire-entertainers', },
  { name: 'Upcoming Events', to: '/upcoming-events', },
  { name: 'BrainBox', to: '/brain-box', },
];

const Header = () => {
  const [isOpen, setOpen,] = useState(false);
  return (
    <header>
      <Header.TopNav />
      <div className="container-fluid">
        <Navbar color="transparent" dark expand="md">
          <NavbarBrand tag={Link} to="/">
            <img alt="Duv Live White Logo" height="75" src={WhiteLogo} />
          </NavbarBrand>
          <NavbarToggler onClick={() => setOpen(!isOpen)} />
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
          <div className="top-header__left col-sm-6">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/">
                  {' '}
                  <img alt="phone icon" src={IconPhone} /> +2348 234 567 890{' '}
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/">info@duvlive.com</a>
              </li>
            </ul>
          </div>
          <div className="top-header__right text-right col-sm-6">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/">Login </a>
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

Header.Menus = ({ menus, }) => {
  return menus.map(menu => (
    <NavItem>
      <NavLink getProps={isActive} tag={Link} to={menu.to}>
        {menu.name}
      </NavLink>
    </NavItem>
  ));
};

const isActive = ({ isCurrent, }) => {
  return isCurrent ? { className: 'active nav-link', } : null;
};

export default Header;
