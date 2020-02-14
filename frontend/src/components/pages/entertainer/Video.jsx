import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DuvLiveModal from 'components/custom/Modal';
import { Alert } from 'reactstrap';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { videoSchema } from 'components/forms/schema/entertainerSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';

const Video = () => {
  const initial = [
    {
      id: 'LX0XMqjjzFA',
      title: 'DJ Cuppy in the  mix'
    },
    {
      id: 'sUNyzg8O6dk',
      title: 'Cuppy Ft L.A.X - Currency (Official Video)'
    },
    {
      id: 'XJteFC9jqVM',
      title: 'Abena - DJ Cuppy'
    },
    {
      id: 'osvde7xNQ0s',
      title: 'Cuppy & Tekno - Green Light (Official Video)'
    },
    {
      id: 'RxzyXOUSRQM',
      title: 'Cuppy on a Mission'
    }
  ];
  const [videos, setVideos] = useState(initial);
  const handleSaveVideo = newVideo => setVideos([newVideo, ...videos]);
  return (
    <BackEndPage title="Videos">
      <div className="main-app">
        <TopMessage message="Add a New Video" />
        <AddVideoForm saveVideo={handleSaveVideo} />

        <section className="app-content">
          <section className="gallery">
            <h3 className="main-app__title mb-3 mt-5">Uploaded Videos</h3>
            <div className="row">
              {videos.map(({ id, title }) => {
                return <Video.Modal key={id} title={title} youtubeId={id} />;
              })}
            </div>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

Video.Card = ({ youtubeId, title }) => (
  <div className="embed-responsive embed-responsive-16by9">
    <iframe
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      frameBorder="0"
      src={`https://www.youtube.com/embed/${youtubeId}`}
      title={title}
    ></iframe>
  </div>
);

Video.Modal = ({ youtubeId, title }) => (
  <DuvLiveModal
    body={<Video.Card title={title} youtubeId={youtubeId} />}
    childrenClassName="d-block col-md-4 mb-4"
    className="modal-full"
    title={title}
  >
    <div className="card card__with-icon">
      <img
        alt={title}
        className="img-fluid"
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
      />
      <div className="card-img-overlay">
        <div className="card-img-overlay__content">
          <span className="icon icon-video"></span>
        </div>
      </div>
    </div>
  </DuvLiveModal>
);

const AddVideoForm = ({ saveVideo }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  return (
    <Formik
      initialValues={setInitialValues(videoSchema)}
      onSubmit={(values, actions) => {
        const { youtube_url, title } = values;
        const url = youtube_url;
        if (url !== undefined || url !== '') {
          // eslint-disable-next-line no-useless-escape
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
          var match = url.match(regExp);
          if (match && match[2].length === 11) {
            saveVideo({ title: title, id: match[2] });
            setSuccess('Your video has been successfully added');
          } else {
            // Do anything for not being valid
            setError('Youtube link seems invalid. Please check and try again');
          }
        }
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-offset-md-2 col-md-8">
            <h4 className="card-title">Add your Youtube videos here</h4>
            <Form>
              <Input
                isValidMessage="Title seems good"
                label="Title"
                name="title"
                placeholder="Enter Title for Video"
              />
              <Input
                isValidMessage="URL seems valid"
                label="Youtube URL"
                name="youtube_url"
                placeholder="Paste your youtube video url here"
                type="url"
              />
              {success && <Alert color="success">{success}</Alert>}
              {error && <Alert color="danger">{error}</Alert>}
              <Button
                className="btn-danger btn-wide btn-transparent mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Add Video
              </Button>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(videoSchema)}
    />
  );
};

AddVideoForm.propTypes = {
  saveVideo: PropTypes.func.isRequired
};

Video.Card.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired
};

Video.Modal.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired
};

export default Video;
