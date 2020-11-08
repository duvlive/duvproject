import React from 'react';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import AdminList from 'components/common/pages/AdminList';
import { getDateTime } from 'utils/date-helpers';

const CronJobNotifications = () => {
  return (
    <BackEndPage title="Cron Job Notifications">
      <AdminList
        apiData="result"
        apiUrl="/api/v1/cron/notifications"
        limit={50}
        pageName="Cron Notification"
        tableRow={CronJobNotificationsRow}
      />
    </BackEndPage>
  );
};

const CronJobNotificationsRow = ({ createdAt, message }) => (
  <tr>
    <td width="20%">
      <small
        className={`icon ${
          message
            ? 'icon-ok-circled text-green'
            : 'icon-dot-circled text-muted--light-2'
        }`}
      ></small>{' '}
      &nbsp;&nbsp;{' '}
      <small
        className={`${message ? 'text-green' : 'text-muted--light-2'} small--4`}
      >
        {getDateTime(createdAt)}
      </small>
    </td>
    <td>
      <small
        className={`small--4 ${message ? 'text-green' : 'text-muted--light-2'}`}
      >
        {message || 'No Review Found'} &nbsp;&nbsp;&nbsp;
      </small>
    </td>
  </tr>
);

CronJobNotificationsRow.propTypes = {
  createdAt: PropTypes.string,
  message: PropTypes.string,
};

CronJobNotificationsRow.propTypes = {
  message: null,
};

export default CronJobNotifications;
