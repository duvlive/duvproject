import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DuvLiveModal from 'components/custom/Modal';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { videoSchema } from 'components/forms/schema/entertainerSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import { approval, getStatus } from 'components/pages/entertainer/Gallery';
import AlertMessage from 'components/common/utils/AlertMessage';

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState({});
  const { userState } = React.useContext(UserContext);

  const handleDelete = (id) => {
    axios
      .delete(`/api/v1/video/delete/${id}`)
      .then(function (response) {
        const { status } = response;
        // handle success
        if (status === 202) {
          const currentVideos = videos.filter((v) => v.id !== id);
          setVideos(currentVideos);
          setMessage({
            type: 'danger',
            msg: 'Video has been successfully deleted',
          });
        }
      })
      .catch(function (error) {
        setVideos([]);
      });
  };

  // Load Videos
  React.useEffect(() => {
    userState.videos && setVideos(userState.videos);
  }, [userState]);

  const handleSaveVideo = (newVideo) => setVideos([newVideo, ...videos]);

  return (
    <BackEndPage title="Videos">
      <div className="main-app">
        <TopMessage message="Add a New Video" />
        <AddVideoForm afterSave={handleSaveVideo} errorMessage={message} />

        <section className="app-content">
          <section className="videos">
            {videos.length > 0 && (
              <h3 className="main-app__title mb-3 mt-5">Uploaded Videos</h3>
            )}
            <div className="row">
              {videos.map(({ id, youtubeID, title, approved }) => {
                return (
                  <Video.Modal
                    deleteVideo={handleDelete}
                    id={id}
                    key={id}
                    status={getStatus(approved)}
                    title={title}
                    youtubeID={youtubeID}
                  />
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

Video.ModalCard = ({ youtubeID, title }) => (
  <div className="embed-responsive embed-responsive-16by9">
    <iframe
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      frameBorder="0"
      src={`https://www.youtube.com/embed/${youtubeID}`}
      title={title}
    ></iframe>
  </div>
);

Video.DeleteVideoIcon = ({ youtubeImage, title, id, deleteVideo }) => {
  return (
    <DuvLiveModal
      actionFn={() => deleteVideo(id)}
      actionText="Yes, Delete Video"
      body={youtubeImage}
      closeModalText="Cancel"
      title={`Delete Video (${title})`}
    >
      <div className="delete-icon right-0">
        <span className="icon icon-cancel-circled"></span>
      </div>
    </DuvLiveModal>
  );
};

Video.DeleteVideoIcon.propTypes = {
  deleteVideo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  youtubeImage: PropTypes.any.isRequired,
};

Video.YoutubeImage = ({ title, youtubeID }) => (
  <img
    alt={title}
    className="img-fluid"
    src={`https://i1.ytimg.com/vi/${youtubeID}/0.jpg`}
  />
);

Video.YoutubeImage.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeID: PropTypes.any.isRequired,
};

Video.YoutubeOverlay = ({ title, youtubeID }) => (
  <div className="card-img-overlay">
    <div className="card-img-overlay__content">
      <span className="icon icon-video"></span>
    </div>
  </div>
);

Video.YoutubeOverlay.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeID: PropTypes.any.isRequired,
};

Video.Modal = ({ youtubeID, status, title, id, deleteVideo, showExtra }) => {
  const youtubeImage = (
    <Video.YoutubeImage title={title} youtubeID={youtubeID} />
  );
  const youtubeOverlay = (
    <Video.YoutubeOverlay title={title} youtubeId={youtubeID} />
  );
  const approvalText = (
    <small
      className={`badge badge-${approval[status].color} transparent-${approval[status].color}`}
    >
      {approval[status].text}
    </small>
  );

  return (
    <section className="d-block col-md-4 mb-4">
      <div className="card card__with-icon position-relative">
        <DuvLiveModal
          body={<Video.ModalCard title={title} youtubeID={youtubeID} />}
          className="modal-full"
          title={title}
        >
          {youtubeImage}
          {youtubeOverlay}
        </DuvLiveModal>
        {showExtra && (
          <Video.DeleteVideoIcon
            deleteVideo={deleteVideo}
            id={id}
            title={title}
            youtubeImage={youtubeImage}
          />
        )}
        {showExtra && approvalText}
      </div>
    </section>
  );
};

Video.Modal.propTypes = {
  deleteVideo: PropTypes.func,
  id: PropTypes.number.isRequired,
  showExtra: PropTypes.bool,
  status: PropTypes.any,
  title: PropTypes.string.isRequired,
  youtubeID: PropTypes.string.isRequired,
};

Video.Modal.defaultProps = {
  deleteVideo: () => {},
  showExtra: true,
  status: 'approved',
};
const AddVideoForm = ({ afterSave, errorMessage }) => {
  const [message, setMessage] = useState({});
  return (
    <Formik
      initialValues={setInitialValues(videoSchema)}
      onSubmit={(values, actions) => {
        const { youtubeID, title } = values;
        const url = youtubeID;
        if (url !== undefined || url !== '') {
          // eslint-disable-next-line no-useless-escape
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
          var match = url.match(regExp);
          if (match && match[2].length === 11) {
            const payload = { title, youtubeID: match[2] };
            axios
              .post('/api/v1/video/save', payload, {
                headers: { 'x-access-token': getTokenFromStore() },
              })
              .then(function (response) {
                const { status, data } = response;
                if (status === 200) {
                  afterSave(data.video);
                  setMessage({
                    msg: 'Your video has been successfully added',
                    type: 'success',
                  });
                  actions.resetForm();
                  actions.setSubmitting(false);
                }
              })
              .catch(function (error) {
                setMessage({ msg: error.response.data.message });
                actions.setSubmitting(false);
              });
          } else {
            setMessage({
              msg: 'Youtube link seems invalid. Please check and try again',
              type: 'danger',
            });
            actions.setSubmitting(false);
          }
        }
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <>
          <div className="card card-custom card-black card-form ">
            <div className="card-body">
              <Form>
                <div className="form-row">
                  <Input
                    formGroupClassName="col-md-6"
                    isValidMessage="Title seems good"
                    label="Title"
                    name="title"
                    placeholder="Enter Title for Video"
                  />
                  <Input
                    formGroupClassName="col-md-6"
                    isValidMessage="URL seems valid"
                    label="Youtube URL"
                    name="youtubeID"
                    placeholder="Paste your youtube video url here"
                    type="url"
                  />
                </div>
                <Button
                  className="btn-danger btn-wide btn-transparent mt-2"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                >
                  Add Video
                </Button>
              </Form>
            </div>
          </div>
          <AlertMessage
            message={
              (message && message.msg) || (errorMessage && errorMessage.msg)
            }
            type={
              (message && message.type) || (errorMessage && errorMessage.type)
            }
          />
        </>
      )}
      validationSchema={createSchema(videoSchema)}
    />
  );
};

AddVideoForm.propTypes = {
  afterSave: PropTypes.func.isRequired,
  errorMessage: PropTypes.object,
};

Video.defaultProps = {
  errorMessage: {},
};
Video.ModalCard.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeID: PropTypes.string.isRequired,
};

export default Video;
