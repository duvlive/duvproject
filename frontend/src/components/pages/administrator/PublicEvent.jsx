import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import defaultImage from 'assets/img/events/public-event.jpg';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber, getRequestStatusIcon } from 'utils/helpers';
import { approval, getStatus } from 'components/pages/entertainer/Gallery';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import Select from 'components/forms/Select';
import { getTokenFromStore } from 'utils/localStorage';
import DuvLiveModal from 'components/custom/Modal';
import { useEntertainerSelect } from 'utils/useHooks';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { Link } from '@reach/router';

const PublicEvent = () => {
  return (
    <BackEndPage title="PublicEvent">
      <AdminList
        apiData="result"
        apiUrl="/api/v1/public-events-all"
        FiclterComponent={PublicEventFilter}
        pageName="Public Event"
        tableRow={PublicEventRow}
      />
    </BackEndPage>
  );
};

const PublicEventRow = ({
  status,
  title,
  id,
  number,
  mainImage,
  user,
  setMessage,
}) => {
  const modalImage = (
    <Image.Big
      className="img-fluid"
      name={`gallery-${number}-${title}`}
      rounded={false}
      src={mainImage || ''}
    />
  );

  const processEvent = (id, approvalStatus) => {
    axios
      .put(
        `/api/v1/public-events/${approvalStatus}/${id}`,
        {},
        {
          headers: { 'x-access-token': getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status } = response;
        if (status === 200) {
          setMessage({
            type: 'success',
            message: `Event has successfully been ${approvalStatus}d`,
          });
        }
      })
      .catch(function (error) {
        console.log('error', error);
        setMessage({
          type: 'danger',
          message: error.response.message,
        });
      });
  };
  const actionFn = () => processEvent(id, status ? 'disapprove' : 'approve');
  const actionText = status ? 'Disapprove Event' : 'Approve Event';
  const buttonColor = `btn btn-sm btn-transparent ${
    status ? 'btn-danger' : 'btn-success'
  }`;

  const modalProps = {
    body: modalImage,
    actionFn,
    actionText,
    cancelButtonColor: 'btn btn-sm btn-transparent btn-info',
    actionButtonColor: buttonColor,
  };

  return (
    <tr>
      <th className="table__number align-middle" scope="row">
        {twoDigitNumber(number)}
      </th>
      <td className=" align-middle">
        <DuvLiveModal {...modalProps}>
          <Image
            className="avatar--medium"
            name={`gallery-${number}`}
            responsiveImage={false}
            rounded={false}
            src={mainImage || defaultImage}
          />
        </DuvLiveModal>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">Status</small>
        <span className="text-muted-light-2">
          {getRequestStatusIcon(approval[getStatus(status)].text)}
        </span>
      </td>

      <td className="align-middle">{title}</td>

      <td className=" align-middle text-center">
        <Image
          className="avatar--small"
          name={`${number}-user`}
          src={user.profileImageURL || ProfileAvatar}
        />
        <span className="small--3 d-block">
          {user.firstName} {user.lastName}
        </span>
      </td>

      <td className="align-middle">
        <Link
          className="btn btn-sm btn-transparent btn-info"
          to={`/admin/public-events/${id}`}
        >
          View Event
        </Link>
        &nbsp; &nbsp; &nbsp;
        {status === null ? (
          <>
            <button
              className="btn btn-sm btn-transparent btn-success"
              onClick={() => processEvent(id, 'approve')}
            >
              <span className="icon icon-ok"></span>
            </button>
            &nbsp; &nbsp; &nbsp;
            <button
              className="btn btn-sm btn-transparent btn-danger"
              onClick={() => processEvent(id, 'disapprove')}
            >
              <span className="icon icon-cancel"></span>
            </button>
          </>
        ) : (
          <button className={buttonColor} onClick={actionFn}>
            {actionText}
          </button>
        )}
      </td>
    </tr>
  );
};

PublicEventRow.defaultProps = {
  status: null,
  number: null,
  imageURL: null,
  user: null,
  title: null,
};

PublicEventRow.propTypes = {
  id: PropTypes.any.isRequired,
  mainImage: PropTypes.string,
  number: PropTypes.any.isRequired,
  setMessage: PropTypes.func.isRequired,
  status: PropTypes.bool,
  title: PropTypes.string,
  user: PropTypes.object,
};

export const PublicEventFilter = ({ setFilterTerms }) => {
  const entertainers = useEntertainerSelect();
  const GALLERY_STATE = [
    { label: 'Any' },
    { label: 'Pending' },
    { label: 'Approved' },
    { label: 'Rejected' },
  ];
  return (
    <Formik
      initialValues={{
        status: 'Any',
        userId: '',
      }}
      onSubmit={({ status, userId }, actions) => {
        const selectedEntertainer = entertainers.filter(
          (entertainer) => entertainer.value.toString() === userId
        );
        setFilterTerms(
          { status, userId },
          {
            status: `Approval State: ${status}`,
            userId: `Entertainer: '${
              (selectedEntertainer[0] && selectedEntertainer[0].label) || 'None'
            }'`,
          }
        );
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form className="card card-custom card-black card-form p-4">
          <>
            <div className="form-row">
              <Select
                formGroupClassName="col-md-6"
                label="Approval State"
                name="status"
                optional
                options={GALLERY_STATE}
                placeholder="PublicEvent Type"
              />
              <Select
                blankOption="Select Entertainer"
                formGroupClassName="col-md-6"
                label="Entertainer"
                name="userId"
                optional
                options={entertainers}
                placeholder="Select Entertainer"
              />
            </div>
            <div className="form-group">
              <Button
                color="danger"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Filter PublicEvent
              </Button>
            </div>
          </>
        </Form>
      )}
    />
  );
};

PublicEventFilter.propTypes = {
  setFilterTerms: PropTypes.func.isRequired,
};

export default PublicEvent;
