import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from '@reach/router';
import classNames from 'classnames';
import UserAvatar from 'assets/img/avatar/user.png';

const TopBar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="topbar">
      <Navbar color="transparent" expand="md">
        <NavbarToggler
          className={classNames({ open: isOpen })}
          onClick={() => setOpen(!isOpen)}
        >
          <span />
          <span />
          <span />
        </NavbarToggler>
        <Collapse className="topbar__header" isOpen={isOpen} navbar>
          <span className="navbar-text">Live Your Best Live</span>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                className="topbar__notification"
                tag={Link}
                to="/user/notifications"
              >
                <i className="icon icon-notification" />
                <span className="dot" />
              </NavLink>
            </NavItem>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Mariam Obi{' '}
                <img
                  alt="Mariam Obi"
                  className="rounded-circle img-responsive avatar--small"
                  src={UserAvatar}
                  title="Mariam Obi"
                />{' '}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Auctions</DropdownItem>
                <DropdownItem>Payment History</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopBar;
