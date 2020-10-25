import React from 'react';

import axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';

const GlobalNotifications = () => {
  const [notifications, setNotifications] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('/api/v1/global/notifications', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setNotifications(data.globalNotification);
        }
      })
      .catch(function (error) {
        setNotifications([]);
      });
  }, []);

  return notifications ? (
    <div className={`global-notifications ${notifications.color}`}>
      {notifications.message}
    </div>
  ) : null;
};
export default GlobalNotifications;
