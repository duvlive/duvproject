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
import { userTopMenu } from 'data/menu/user';
import { entertainerTopMenu } from 'data/menu/entertainer';
import { bandMemberTopMenu } from 'data/menu/band-member';
import { administratorTopMenu } from 'data/menu/administrator';
import LiveYourBestLife from '../utils/LiveYourBestLife';
import { getCurrentUser } from 'utils/localStorage';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { getSampleUser, getSampleAvatar } from 'utils/sampleData';
import { USER_TYPES } from 'utils/constants';

const TOP_MENU = {
  [USER_TYPES.user]: userTopMenu,
  [USER_TYPES.entertainer]: entertainerTopMenu,
  [USER_TYPES.admin]: administratorTopMenu,
  [USER_TYPES.bandMember]: bandMemberTopMenu
};

const TopBar = ({ showSidebar }) => {
  const currentUser = getCurrentUser();
  const menus = TOP_MENU[currentUser.type];
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

            <TopBar.Navigation menus={menus} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

TopBar.propTypes = {
  showSidebar: PropTypes.func.isRequired
};

TopBar.Navigation = ({ menus }) => {
  const topMenu = menus.map(({ title, to }) => (
    <DropdownItem key={title}>
      <Link className="text-color" to={to}>
        {title}
      </Link>
    </DropdownItem>
  ));

  const currentUser = getCurrentUser();
  const src = currentUser.id
    ? currentUser.profileImgURL || ProfileAvatar
    : getSampleAvatar();
  const userName = currentUser.id
    ? currentUser.firstName + ' ' + currentUser.lastName
    : getSampleUser();
  return (
    <UncontrolledDropdown inNavbar nav>
      <DropdownToggle caret nav>
        <span className="d-none d-sm-inline">{userName} &nbsp;</span>
        <img
          alt={userName}
          className="rounded-circle img-responsive avatar--small"
          src={src}
          title={userName}
        />{' '}
      </DropdownToggle>
      <DropdownMenu right>
        {topMenu}
        <DropdownItem divider />
        <DropdownItem>
          <Link className="text-color" to="/logout">
            Logout
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

TopBar.Navigation.propTypes = {
  menus: PropTypes.array.isRequired
};

export default TopBar;
