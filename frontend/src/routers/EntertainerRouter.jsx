import React from 'react';
import { Router, navigate } from '@reach/router';
import Dashboard from 'components/pages/entertainer/Dashboard';
import Bids from 'components/pages/entertainer/Bids';
import AvailableAuctions from 'components/pages/entertainer/AvailableAuctions';
import NewBid from 'components/pages/entertainer/NewBid';
import ViewBid from 'components/pages/entertainer/ViewBid';
import ViewEvent from 'components/pages/entertainer/ViewEvent';
import UpcomingEvents from 'components/pages/entertainer/UpcomingEvents';
import Payments from 'components/pages/entertainer/Payments';
import EditProfile from 'components/pages/entertainer/EditProfile';
import Gallery from 'components/pages/entertainer/Gallery';
import Video from 'components/pages/entertainer/Video';
import Badges from 'components/pages/entertainer/Badges';
import BandMembers from 'components/pages/entertainer/BandMembers';
import EmergencyContacts from 'components/pages/entertainer/accountSetup/EmergencyContacts';
import InviteFriends from 'components/common/pages/InviteFriends';
import Help from 'components/pages/user/Help';
import Logout from 'components/pages/auth/Logout';
import AccountSetup from 'components/pages/entertainer/accountSetup/AccountSetup';
import BankDetails from 'components/pages/entertainer/accountSetup/BankDetails';
import { UserContext } from 'context/UserContext';
import { getUserTypeFromStore } from 'utils/localStorage';
import { USER_TYPES } from 'utils/constants';
import { DASHBOARD_PAGE } from 'utils/constants';
import Requests from 'components/pages/entertainer/Requests';
import ViewRequest from 'components/pages/entertainer/ViewRequest';
import Notifications from 'components/common/pages/Notifications';
import ChangePassword from 'components/common/pages/ChangePassword';

const EntertainerRouter = () => {
  const { userState } = React.useContext(UserContext);
  React.useEffect(() => {
    const currentUserType = userState.type || getUserTypeFromStore();
    if (currentUserType !== USER_TYPES.entertainer) {
      // ensure that this can only be accessed by entertainers
      navigate(`/${DASHBOARD_PAGE[currentUserType]}/dashboard`);
    }
  }, [userState.type]);

  return (
    <Router>
      <Dashboard path="/dashboard" />
      <Bids path="/bids" />
      <AvailableAuctions path="/available-auctions" />
      <NewBid path="/bid/:eventEntertainerId" />
      <ViewBid path="/bid/view/:applicationId" />
      <ViewRequest path="/request/view/:applicationId" />
      <ViewEvent path="/events/view/:eventEntertainerId" />
      <Notifications path="/notifications" />
      <UpcomingEvents path="/events" />
      <Requests path="/requests" />
      <Payments path="/payments" />
      <EditProfile path="/edit-profile" />
      <Gallery path="/gallery" />
      <Video path="/videos" />
      <Badges path="/badges" />
      <BandMembers path="/band-members" />
      <EmergencyContacts path="/emergency-contacts" />
      <BankDetails path="/bank-details" />
      <AccountSetup path="/account-setup" />
      <AccountSetup path="/account-setup/:stepFromURL" />
      <InviteFriends path="/invite-friends" />
      <ChangePassword path="/change-password" />
      <Help path="/help" />
      <Logout path="/logout" />
    </Router>
  );
};

export default EntertainerRouter;
