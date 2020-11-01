import React from 'react';

import axios from 'axios';
import {
  getCancelledNotificationFromStore,
  getTokenFromStore,
  storeCancelledNotification,
} from 'utils/localStorage';

const GlobalNotifications = () => {
  const [notification, setNotification] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('/api/v1/global/notifications', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          setNotification(data.globalNotification);
        }
      })
      .catch(function (error) {
        setNotification({});
      });
  }, []);

  const closeNotification = (notificationId) => {
    setNotification(null);
    storeCancelledNotification(notificationId);
  };

  return notification &&
    notification.id !== getCancelledNotificationFromStore() ? (
    <div className={`global-notifications ${notification.color}`}>
      {notification.message}
      <div
        className="global-notifications__close"
        onClick={() => closeNotification(notification.id)}
      >
        <span className="icon-cancel-circled icon"></span>
      </div>
    </div>
  ) : null;
};
export default GlobalNotifications;
