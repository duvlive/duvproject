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
  DropdownItem,
} from 'reactstrap';
import Humanize from 'humanize-plus';
import { Link, Match } from '@reach/router';
import { userTopMenu } from 'data/menu/user';
import { entertainerTopMenu } from 'data/menu/entertainer';
import { bandMemberTopMenu } from 'data/menu/band-member';
import { administratorTopMenu } from 'data/menu/administrator';
import LiveYourBestLife from '../utils/LiveYourBestLife';
import { USER_TYPES, DASHBOARD_PAGE } from 'utils/constants';
import { UserContext } from 'context/UserContext';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { getUserTypeFromStore } from 'utils/localStorage';

const TOP_MENU = {
  [USER_TYPES.user]: userTopMenu,
  [USER_TYPES.entertainer]: entertainerTopMenu,
  [USER_TYPES.admin]: administratorTopMenu,
  [USER_TYPES.bandMember]: bandMemberTopMenu,
};

const TopBar = ({ showSidebar }) => {
  let { userState } = React.useContext(UserContext);
  const currentUserType = userState.type || getUserTypeFromStore();
  const menus = TOP_MENU[currentUserType];

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
                to={`/${DASHBOARD_PAGE[userState.type]}/notifications`}
              >
                <i className="icon icon-notification" />
                <span className="dot" />
              </NavLink>
            </NavItem>

            <Match path="/user/:item">
              {(props) =>
                // eslint-disable-next-line react/prop-types
                props.match && currentUserType !== USER_TYPES.user ? (
                  <TopBarNavigation menus={TOP_MENU[USER_TYPES.user]} />
                ) : (
                  <TopBarNavigation menus={menus} />
                )
              }
            </Match>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

TopBar.propTypes = {
  showSidebar: PropTypes.func.isRequired,
};

const TopBarNavigation = ({ menus }) => {
  let { userState } = React.useContext(UserContext);
  const userName =
    userState.firstName.length > 20
      ? Humanize.truncate(userState.firstName, 15)
      : userState.firstName;

  const topMenu = menus.map(({ title, to }) => (
    <DropdownItem key={title}>
      <Link className="text-color" to={to}>
        {title}
      </Link>
    </DropdownItem>
  ));

  return (
    <UncontrolledDropdown inNavbar nav>
      <DropdownToggle caret nav>
        <span className="d-none d-sm-inline text-capitalize">
          {userName} &nbsp;
        </span>
        <img
          alt={userName}
          className="rounded-circle img-responsive avatar--small"
          src={userState.profileImg || ProfileAvatar}
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

TopBarNavigation.propTypes = {
  menus: PropTypes.array.isRequired,
};

export default TopBar;
