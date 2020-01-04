import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from '@reach/router';
import UserAvatar from 'assets/img/avatar/user.png';
import EntertainerAvatar from 'assets/img/avatar/entertainer.jpg';
import BandMemberAvatar from 'assets/img/avatar/band-member.png';
import AdministratorAvatar from 'assets/img/avatar/administrator.png';
import { Match } from '@reach/router';
import LiveYourBestLife from '../utils/LiveYourBestLife';

const TopBar = ({ showSidebar }) => {
  return (
    <div className="topbar">
      <Navbar color="transparent" expand>
        <Collapse className="topbar__header" navbar>
          <button
            className={'d-block d-sm-none menu-button'}
            onClick={showSidebar}
          >
            <div />
          </button>

          <span className="navbar-text">
            <LiveYourBestLife />
          </span>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                className="topbar__notification d-none d-sm-block"
                tag={Link}
                to="/user/notifications"
              >
                <i className="icon icon-notification" />
                <span className="dot" />
              </NavLink>
            </NavItem>
            {/* User */}
            <Match path="/entertainer/*">
              {props => (props.match ? <EntertainerTopNavigation /> : null)}
            </Match>

            {/* Band Member */}
            <Match path="/band-member/*">
              {props => (props.match ? <BandMemberTopNavigation /> : null)}
            </Match>

            {/* Entertainer */}
            <Match path="/user/*">
              {props => (props.match ? <UserTopNavigation /> : null)}
            </Match>

            {/* Administrator */}
            <Match path="/administrator/*">
              {props => (props.match ? <AdministratorTopNavigation /> : null)}
            </Match>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

TopBar.propTypes = {
  showSidebar: PropTypes.func.isRequired
};

const UserTopNavigation = () => (
  <UncontrolledDropdown inNavbar nav>
    <DropdownToggle caret nav>
      <span className="d-none d-sm-inline">Mariam Obi </span>
      <img
        alt="Mariam Obi"
        className="rounded-circle img-responsive avatar--small"
        src={UserAvatar}
        title="Mariam Obi"
      />{' '}
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem>
        <Link className="text-color" to="/user/auctions">
          Auctions
        </Link>
      </DropdownItem>
      <DropdownItem>
        <Link className="text-color" to="/user/payments-history">
          Payment History
        </Link>
      </DropdownItem>
      <DropdownItem>
        <Link className="text-color" to="/user/change-password">
          Change Password
        </Link>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem>
        <Link className="text-color" to="/logout">
          Logout
        </Link>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const BandMemberTopNavigation = () => (
  <UncontrolledDropdown inNavbar nav>
    <DropdownToggle caret nav>
      <span className="d-none d-sm-inline">High Soul </span>
      <img
        alt="High Soul"
        className="rounded-circle img-responsive avatar--small"
        src={BandMemberAvatar}
        title="High Soul"
      />{' '}
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem>
        <Link className="text-color" to="/band-member/payments-history">
          Payment History
        </Link>
      </DropdownItem>
      <DropdownItem>
        <Link className="text-color" to="/band-member/change-password">
          Change Password
        </Link>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem>
        <Link className="text-color" to="/logout">
          Logout
        </Link>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const EntertainerTopNavigation = () => (
  <UncontrolledDropdown inNavbar nav>
    <DropdownToggle caret nav>
      <span className="d-none d-sm-inline">DJ Cuppy </span>
      <img
        alt="DJ Cuppy"
        className="rounded-circle img-responsive avatar--small"
        src={EntertainerAvatar}
        title="DJ Cuppy"
      />{' '}
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem>
        <Link className="text-color" to="/entertainer/bids">
          My Bids
        </Link>
      </DropdownItem>
      <DropdownItem>
        <Link className="text-color" to="/entertainer/payments-history">
          Payment History
        </Link>
      </DropdownItem>
      <DropdownItem>
        <Link className="text-color" to="/user/dashboard">
          Login as User
        </Link>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem>
        <Link className="text-color" to="/logout">
          Logout
        </Link>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const AdministratorTopNavigation = () => (
  <UncontrolledDropdown inNavbar nav>
    <DropdownToggle caret nav>
      <span className="d-none d-sm-inline">U.V </span>
      <img
        alt="U.V"
        className="rounded-circle img-responsive avatar--small"
        src={AdministratorAvatar}
        title="U.V"
      />{' '}
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem>
        <Link className="text-color" to="/entertainer/entertainer-payment">
          Recent Entertainers' Payment
        </Link>
      </DropdownItem>
      <DropdownItem>
        <Link className="text-color" to="/user/dashboard">
          Login as User
        </Link>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem>
        <Link className="text-color" to="/logout">
          Logout
        </Link>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

export default TopBar;
