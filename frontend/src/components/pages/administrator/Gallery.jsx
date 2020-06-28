import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber, getRequestStatusIcon } from 'utils/helpers';
import { approval, getStatus } from 'components/pages/entertainer/Gallery';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import Select from 'components/forms/Select';
import { getTokenFromStore } from 'utils/localStorage';
import DuvLiveModal from 'components/custom/Modal';
import { useEntertainerSelect } from 'utils/useHooks';

const Gallery = () => {
  return (
    <BackEndPage title="Gallery">
      <AdminList
        FilterComponent={GalleryFilter}
        apiData="result"
        apiUrl="/api/v1/gallery-all"
        pageName="Gallery"
        pluralPageName="Galleries"
        tableRow={GalleryRow}
      />
    </BackEndPage>
  );
};

const GalleryRow = ({ approved, id, number, imageURL, user, setMessage }) => {
  const modalImage = (
    <Image.Big
      className="img-fluid"
      name={`gallery-${number}-${user.profile.stageName}`}
      rounded={false}
      src={imageURL}
    />
  );

  const processImage = (id, approvalStatus) => {
    axios
      .put(
        `/api/v1/gallery/${approvalStatus}/${id}`,
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
            message: `Image has successfully been ${approvalStatus}d`,
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
  const actionFn = () => processImage(id, approved ? 'disapprove' : 'approve');
  const actionText = approved ? 'Disapprove Image' : 'Approve Image';
  const buttonColor = `btn btn-sm btn-transparent ${
    approved ? 'btn-danger' : 'btn-success'
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
            src={imageURL}
          />
        </DuvLiveModal>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">Status</small>
        <span className="text-muted-light-2">
          {getRequestStatusIcon(approval[getStatus(approved)].text)}
        </span>
      </td>

      <td className=" align-middle">
        <Image
          className="avatar--small"
          name={`${number}-entertainer`}
          responsiveVideo={false}
          src={user.profileImageURL || ProfileAvatar}
        />
        <span className="small--3 d-block">
          {user.profile.stageName || '-'}
        </span>
      </td>

      <td className="align-middle">
        <DuvLiveModal {...modalProps}>
          <button className="btn btn-sm btn-transparent btn-info">
            View Image
          </button>
        </DuvLiveModal>
        &nbsp; &nbsp; &nbsp;
        {approved === null ? (
          <>
            <button
              className="btn btn-sm btn-transparent btn-success"
              onClick={() => processImage(id, 'approve')}
            >
              <span className="icon icon-ok"></span>
            </button>
            &nbsp; &nbsp; &nbsp;
            <button
              className="btn btn-sm btn-transparent btn-danger"
              onClick={() => processImage(id, 'disapprove')}
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

GalleryRow.defaultProps = {
  approved: null,
  number: null,
  imageURL: null,
  user: null,
};

GalleryRow.propTypes = {
  approved: PropTypes.bool,
  id: PropTypes.any.isRequired,
  imageURL: PropTypes.string,
  number: PropTypes.any.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export const GalleryFilter = ({ setFilterTerms }) => {
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
        approved: 'Any',
        userId: '',
      }}
      onSubmit={({ approved, userId }, actions) => {
        const selectedEntertainer = entertainers.filter(
          (entertainer) => entertainer.value.toString() === userId
        );
        setFilterTerms(
          { approved, userId },
          {
            approved: `Approval State: ${approved}`,
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
                name="approved"
                optional
                options={GALLERY_STATE}
                placeholder="Gallery Type"
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
                Filter Gallery
              </Button>
            </div>
          </>
        </Form>
      )}
    />
  );
};

GalleryFilter.propTypes = {
  setFilterTerms: PropTypes.func.isRequired,
};

export default Gallery;
