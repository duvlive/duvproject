import React from 'react';
import PropTypes from 'prop-types';
import Timeago from 'react-timeago';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import NoContent from 'components/common/utils/NoContent';
import { getLongDate } from 'utils/date-helpers';
import { getTokenFromStore } from 'utils/localStorage';

const NOTIFICATIONS_COLOR = ['red', 'yellow', 'blue', 'green'];

const Notifications = () => {
  const [notifications, setNotifications] = React.useState([]);
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
          setNotifications(data.notifications);
          console.log('data.notification: ', data.notifications);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  }, []);
  return (
    <BackEndPage title="Notifications">
      <div className="main-app">
        <TopMessage message="Notifications" />

        <section className="app-content">
          <div className="table-responsive">
            {notifications.length > 0 ? (
              <table className="table table-dark table__no-border table__with-bg">
                <tbody>
                  {notifications.map((notification, index) => (
                    <NotificationsRow key={index} notification={notification} />
                  ))}
                </tbody>
              </table>
            ) : (
              <NoContent text="No Notifications found" />
            )}
            <br />
            <br />
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

const NotificationsRow = ({ notification }) => (
  <>
    <tr className="transparent">
      <td className="pt-4" colSpan="4">
        <h4 className="main-app__subtitle">
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
