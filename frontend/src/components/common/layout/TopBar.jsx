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
import { USER_TYPES } from 'utils/constants';
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

  const USER_NAME = {
    [USER_TYPES.user]: userState.firstName,
    [USER_TYPES.entertainer]:
      userState.entertainerProfile && userState.entertainerProfile.stageName,
    [USER_TYPES.admin]: userState.firstName,
    [USER_TYPES.bandMember]: userState.firstName,
  };

  const userHasPendingNotifications =
    userState.notifications && userState.notifications.length > 0;

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
              {Object.keys(USER_TYPES).map((page) => (
                <Match key={page} path={`/${page}/*`}>
                  {({ match }) =>
                    match && (
                      <NavLink
                        className="topbar__notification d-block"
                        tag={Link}
                        to={`/${page}/notifications`}
                      >
                        <i className="icon icon-notification" />
                        {userHasPendingNotifications && (
                          <span className="dot" />
                        )}
                      </NavLink>
                    )
                  }
                </Match>
              ))}
            </NavItem>

            <Match path="/user/*">
              {(props) =>
                // eslint-disable-next-line react/prop-types
                props.match && currentUserType !== USER_TYPES.user ? (
                  <TopBarNavigation
                    menus={TOP_MENU[USER_TYPES.user]}
                    userName={USER_NAME[USER_TYPES.user]}
                  />
                ) : (
                  <TopBarNavigation
                    menus={menus}
                    userName={
                      USER_NAME[currentUserType] || USER_NAME[USER_TYPES.user]
                    }
                  />
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

const TopBarNavigation = ({ menus, userName }) => {
  let { userState } = React.useContext(UserContext);
  const displayedName =
    userName.length > 20 ? Humanize.truncate(userName, 15) : userName;

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
          {displayedName} &nbsp;
        </span>
        <img
          alt={userName}
          className="rounded-circle img-responsive avatar--small"
          src={userState.profileImg || ProfileAvatar}
          title={userName}
        />{' '}
      </DropdownToggle>
      <DropdownMenu right>
        {/* Show Entertainer Profile */}
        <Match path="/entertainer/*">
          {(props) =>
            // eslint-disable-next-line react/prop-types
            props.match &&
            userState.type === USER_TYPES.entertainer &&
            userState.entertainerProfile &&
            userState.entertainerProfile.slug && (
              <DropdownItem>
                <Link
                  className="text-color"
                  to={`/entertainers/profile/${userState.entertainerProfile.slug}`}
                >
                  View My Profile
                </Link>
              </DropdownItem>
            )
          }
        </Match>

        {/* Display Top Menu */}
        {topMenu}

        {/* Switch Back to Entertainer Account */}
        <Match path="/user/*">
          {(props) =>
            // eslint-disable-next-line react/prop-types
            props.match &&
            userState.type === USER_TYPES.entertainer && (
              <DropdownItem>
                <Link className="text-color" to={'/entertainer/dashboard'}>
                  Switch to Entertainer
                </Link>
              </DropdownItem>
            )
          }
        </Match>
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
  userName: PropTypes.string.isRequired,
};

export default TopBar;
