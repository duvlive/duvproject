import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber } from 'utils/helpers';
import { getDateTime } from 'utils/date-helpers';
import Button from 'components/forms/Button';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { addGlobalNotificationObject } from 'components/forms/schema/userSchema';
import { setInitialValues } from 'components/forms/form-helper';
import { Formik, Form } from 'formik';
import { getTokenFromStore } from 'utils/localStorage';
import Select from 'components/forms/Select';
import TextArea from 'components/forms/TextArea';
import { UserContext } from 'context/UserContext';
import { USER_TYPES } from 'utils/constants';
import Humanize from 'humanize-plus';
import DatePicker from 'components/forms/DatePicker';
import { addDays, isFuture, isPast } from 'date-fns';
import DuvLiveModal from 'components/custom/Modal';
import { Link } from '@reach/router';

const userTypes = Object.keys(USER_TYPES);

const GlobalNotifications = ({ showAll }) => {
  const title = showAll
    ? 'Global Notifications'
    : 'Active Global Notifications';

  return (
    <BackEndPage title={`${title}`}>
      <AdminList
        AddNewComponent={AddNewComponent}
        apiData="result"
        apiUrl="/api/v1/admin/global/notification"
        OtherContentComponent={ShowMore}
        pageName={'Global Notification'}
        showAll={showAll}
        tableRow={GlobalNotificationsRow}
      />
    </BackEndPage>
  );
};

GlobalNotifications.propTypes = {
  showAll: PropTypes.string,
};

GlobalNotifications.defaultProps = {
  showAll: null,
};

const GlobalNotificationsRow = ({
  color,
  adminUser,
  id,
  message,
  number,
  startTime,
  endTime,
  userType,
}) => {
  const isActiveNotification = () => isPast(startTime) && isFuture(endTime);
  const isPastNotification = () => isPast(endTime);
  const isFutureNotification = () => isFuture(startTime);
  return (
    <tr>
      <th className="table__number align-middle" scope="row">
        {twoDigitNumber(number)}
      </th>
      <td className="align-middle">
        <small className="small--4 text-muted">Message</small>
        <span className={`table__title text-${color}-100`}>
          {Humanize.truncate(message, 19)}
        </span>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">User </small>
        <span className="text-muted-light-2">
          {' '}
          {userType > USER_TYPES.bandMember
            ? 'All'
            : userTypes[userType].toUpperCase()}
        </span>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">Start Time</small>
        <span className="text-muted-light-2">{getDateTime(startTime)}</span>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">End Time</small>
        <span className="text-muted-light-2">{getDateTime(endTime)}</span>
      </td>

      <td className=" align-middle">
        <Image
          className="avatar--small"
          name={`${number}-badge`}
          responsiveImage={false}
          src={adminUser.profileImageURL || ProfileAvatar}
        />
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">Added By</small>
        <span className="text-muted-light-2">
          {adminUser.firstName} {adminUser.lastName}
        </span>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">Status</small>
        {isActiveNotification() && (
          <span className={'icon-ok-circled text-green'}></span>
        )}
        {isFutureNotification() && (
          <span className={'icon-hourglass text-yellow'}></span>
        )}
        {isPastNotification() && (
          <span className={'icon-cancel-circled text-red'}></span>
        )}
      </td>

      <td className="align-middle">
        <DuvLiveModal
          body={
            <ViewGlobalNotification
              notification={{
                id,
                color,
                message,
                startTime,
                endTime,
                userType,
              }}
            />
          }
          className="modal-large"
          title="Notification"
        >
          <button className="btn btn-sm btn-transparent btn-danger">
            View Notification
          </button>
        </DuvLiveModal>
      </td>
    </tr>
  );
};

GlobalNotificationsRow.defaultProps = {
  color: null,
  message: null,
  createdAt: null,
  userType: null,
  adminUser: { firstName: null, lastName: null },
};

GlobalNotificationsRow.propTypes = {
  adminUser: PropTypes.object,
  color: PropTypes.string,
  createdAt: PropTypes.string,
  endTime: PropTypes.string.isRequired,
  entertainerType: PropTypes.string,
  id: PropTypes.any.isRequired,
  message: PropTypes.string.isRequired,
  number: PropTypes.any.isRequired,
  startTime: PropTypes.string.isRequired,
  userType: PropTypes.any,
};

export const AddNewComponent = ({ addData, setMessage }) => {
  const { userState } = React.useContext(UserContext);
  return (
    <Formik
      initialValues={setInitialValues(addGlobalNotificationObject)}
      onSubmit={(value, actions) => {
        const payload = {
          ...value,
          endTime: value.endTime.date,
          startTime: value.startTime.date,
        };
        axios
          .post('/api/v1/admin/global/notification', payload, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            if (status === 200) {
              addData({
                ...data.globalNotification,
                adminUser: {
                  id: userState.id,
                  firstName: userState.firstName,
                  lastName: userState.lastName,
                  profileImageURL: userState.profileImg,
                },
              });
              setMessage({ message: data.message, type: 'success' });
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            actions.setSubmitting(false);
          });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form className="card card-custom card-black card-form p-4">
          <>
            <h5 className="sub-title py-3">New Global Notification</h5>
            <GlobalNotificationsForm />

            <div className="form-group">
              <Button
                color="danger"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Add Notification
              </Button>
            </div>
          </>
        </Form>
      )}
      validationSchema={createSchema(addGlobalNotificationObject)}
    />
  );
};

const ViewGlobalNotification = ({ notification }) => {
  const [editNotification, setEditNotification] = React.useState(false);

  const ViewNotification = ({ notification }) => (
    <section>
      <p className={`text-normal mt-3 text-${notification.color}`}>
        {notification.message}
      </p>

      <button
        className="mt-5 btn btn-sm btn-transparent btn-info"
        onClick={() => setEditNotification(true)}
      >
        Edit Notification
      </button>
    </section>
  );
  return editNotification ? (
    <EditGlobalNotification
      backToView={() => setEditNotification(false)}
      notification={notification}
    />
  ) : (
    <ViewNotification notification={notification} />
  );
};

ViewGlobalNotification.propTypes = {
  notification: PropTypes.object.isRequired,
};

const EditGlobalNotification = ({ notification, backToView }) => {
  return (
    <Formik
      initialValues={setInitialValues(addGlobalNotificationObject, {
        ...notification,
      })}
      onSubmit={(value, actions) => {
        const payload = {
          ...value,
          id: notification.id,
          endTime: value.endTime.date,
          startTime: value.startTime.date,
        };
        axios
          .put('/api/v1/admin/global/notification', payload, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              actions.setSubmitting(false);
              window.location.reload();
            }
          })
          .catch(function (error) {
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form>
          <>
            <h5 className="sub-title py-3">Edit Notification</h5>
            <GlobalNotificationsForm />

            <div className="form-group">
              <Button
                color="info"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Edit Notification
              </Button>
              &nbsp;&nbsp;
              <Button color="danger" onClick={backToView}>
                Back to View
              </Button>
            </div>
          </>
        </Form>
      )}
      validationSchema={createSchema(addGlobalNotificationObject)}
    />
  );
};

EditGlobalNotification.propTypes = {
  backToView: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
};

const GlobalNotificationsForm = () => (
  <>
    <TextArea
      label="Message"
      name="message"
      placeholder="Notification message"
    />
    <div className="row">
      <DatePicker
        dateFormat="MMMM d, yyyy h:mm aa"
        formGroupClassName="col-md-6"
        label="Notification Starts"
        minDate={addDays(new Date(), 0)}
        name="startTime"
        placeholder="Event Start Time"
        showTimeSelect
        timeIntervals={15}
      />

      <DatePicker
        dateFormat="MMMM d, yyyy h:mm aa"
        formGroupClassName="col-md-6"
        label="Notification Ends"
        minDate={addDays(new Date(), 0)}
        name="endTime"
        placeholder="Event Date"
        showTimeSelect
        timeIntervals={15}
      />
    </div>
    <div className="row">
      <Select
        blankOption="Select User Type"
        formGroupClassName="col-md-6"
        label="User Type"
        name="userType"
        options={[
          { value: 1000, label: 'All' },
          { value: 0, label: 'Admin' },
          { value: 1, label: 'Users' },
          { value: 2, label: 'Entertainers' },
          { value: 3, label: 'Band Members' },
        ]}
        placeholder="GlobalNotification Title"
      />
      <Select
        blankOption="Select Color"
        formGroupClassName="col-md-6"
        label="Color"
        name="color"
        options={[
          { value: 'blue', label: 'Information' },
          { value: 'red', label: 'Danger' },
          { value: 'green', label: 'Success' },
          { value: 'yellow', label: 'Warning' },
        ]}
        placeholder="GlobalNotification Title"
      />
      {/* <Select
    blankOption="Select Entertainer Type"
    formGroupClassName="col-md-6"
    label="Entertainer Type"
    name="entertainerType"
    options={[
      { value: 'All' },
      { value: 'DJ' },
      { value: 'MC' },
      { value: 'LiveBand' },
    ]}
    placeholder="Entertainer Type"
  /> */}
    </div>
  </>
);

AddNewComponent.propTypes = {
  addData: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export const ShowMore = ({ showAll }) => {
  return showAll ? (
    <Link
      className="btn btn-transparent btn-wide btn-success mb-5"
      to="/admin/global-notifications"
    >
      Show Active Notifications
    </Link>
  ) : (
    <Link
      className="btn btn-transparent btn-wide btn-info mb-5"
      to="/admin/global-notifications/showAll"
    >
      Show All Notifications
    </Link>
  );
};

ShowMore.propTypes = {
  showAll: PropTypes.string,
};
ShowMore.defaultProps = {
  showAll: null,
};

export default GlobalNotifications;
