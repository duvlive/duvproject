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
import Video from 'components/pages/entertainer/Video';
import { useEntertainerSelect } from 'utils/useHooks';

const Videos = () => {
  return (
    <BackEndPage title="Video">
      <AdminList
        apiData="result"
        apiUrl="/api/v1/video-all"
        FilterComponent={VideoFilter}
        pageName="Video"
        tableRow={VideoRow}
      />
    </BackEndPage>
  );
};

const VideoRow = ({
  approved,
  id,
  number,
  youtubeID,
  title,
  user,
  setMessage,
}) => {
  const processVideo = (id, approvalStatus) => {
    axios
      .put(
        `/api/v1/video/${approvalStatus}/${id}`,
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
            message: `Video has successfully been ${approvalStatus}d`,
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
  const actionFn = () => processVideo(id, approved ? 'disapprove' : 'approve');
  const actionText = approved ? 'Disapprove Video' : 'Approve Video';
  const buttonColor = `btn btn-sm btn-transparent ${
    approved ? 'btn-danger' : 'btn-success'
  }`;

  const modalProps = {
    body: <Video.ModalCard title={title} youtubeID={youtubeID} />,
    actionFn,
    actionText,
    className: 'modal-full',
    title: title,
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
          <div className="position-relative youtube-video-thumbnail">
            <Video.YoutubeImage title={title} youtubeID={youtubeID} />
          </div>
        </DuvLiveModal>
      </td>

      <td className="align-middle">
        <small className="small--4 text-muted">Title</small>
        <span className="table__title">{title}</span>
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
            Watch Video
          </button>
        </DuvLiveModal>
        &nbsp; &nbsp; &nbsp;
        {approved === null ? (
          <>
            <button
              className="btn btn-sm btn-transparent btn-success"
              onClick={() => processVideo(id, 'approve')}
            >
              <span className="icon icon-ok"></span>
            </button>
            &nbsp; &nbsp; &nbsp;
            <button
              className="btn btn-sm btn-transparent btn-danger"
              onClick={() => processVideo(id, 'disapprove')}
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

VideoRow.defaultProps = {
  approved: null,
  number: null,
  title: null,
  youtubeID: null,
  user: null,
};

VideoRow.propTypes = {
  approved: PropTypes.bool,
  id: PropTypes.any.isRequired,
  number: PropTypes.any.isRequired,
  setMessage: PropTypes.func.isRequired,
  title: PropTypes.string,
  user: PropTypes.object,
  youtubeID: PropTypes.string,
};

export const VideoFilter = ({ setFilterTerms }) => {
  const entertainers = useEntertainerSelect();

  const VIDEO_STATE = [
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
                options={VIDEO_STATE}
                placeholder="Video Type"
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
                Filter Video
              </Button>
            </div>
          </>
        </Form>
      )}
    />
  );
};

VideoFilter.propTypes = {
  setFilterTerms: PropTypes.func.isRequired,
};

export default Videos;
