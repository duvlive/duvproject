import React from 'react';
import PropTypes from 'prop-types';
import Timeago from 'react-timeago';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import NoContent from 'components/common/utils/NoContent';
import { getLongDate } from 'utils/date-helpers';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/common/utils/LoadItems';
import { UserContext } from 'context/UserContext';

const NOTIFICATIONS_COLOR = ['red', 'yellow', 'blue', 'green'];

const Notifications = () => {
  const [notifications, setNotifications] = React.useState(null);
  const { userDispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    axios
      .get('/api/v1/notifications', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          userDispatch({
            type: 'notifications',
          });
          setNotifications(data.notifications);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setNotifications([]);
      });
  }, [userDispatch]);
  return (
    <BackEndPage title="Notifications">
      <div className="main-app">
        <TopMessage />

        <section className="app-content">
          <LoadItems
            items={notifications}
            loadingText="Loading your Notifications"
            noContent={<NoContent isButton text="No Notifications found" />}
          >
            <NotificationsRowList notifications={notifications || []} />
          </LoadItems>
        </section>
      </div>
    </BackEndPage>
  );
};

const NotificationsRowList = ({ notifications }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {notifications.map((notification, index) => (
          <NotificationsRow key={index} notification={notification} />
        ))}
      </tbody>
    </table>
    <br />
    <br />
  </div>
);

NotificationsRowList.propTypes = {
  notifications: PropTypes.array.isRequired,
};

const NotificationsRow = ({ notification }) => (
  <>
    <tr className="transparent">
      <td className="pt-4" colSpan="4">
        <h4 className="main-app__subtitle small--2">
          <Timeago date={notification.createdAt} />
        </h4>
      </td>
    </tr>
    <tr>
      <th className="table__number" scope="row" width="5%">
        <span className={`circle ${NOTIFICATIONS_COLOR[notification.type]}`} />
      </th>
      <td width="25%">
        <span className="text-white">{notification.title}</span>
      </td>
      <td width="50%">
        <span className="text-muted-light-2">{notification.description}</span>
      </td>
      <td className="text-right" width="20%">
        <span>
          <i className="icon icon-clock" />{' '}
          {getLongDate(notification.createdAt)}
        </span>
      </td>
    </tr>
  </>
);

NotificationsRow.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notifications;
