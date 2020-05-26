import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DuvLiveModal from 'components/custom/Modal';
import { getTokenFromStore } from 'utils/localStorage';
import { approval, getStatus } from 'components/pages/entertainer/Gallery';
import NoContent from 'components/common/utils/NoContent';
import LoadItems from 'components/common/utils/LoadItems';

const Video = () => {
  const [videos, setVideos] = useState(null);

  // Load Videos
  React.useEffect(() => {
    axios
      .get('/api/v1/videos/bandMember', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          console.log('data', data);
          setVideos(data.videos);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setVideos([]);
      });
  }, []);

  return (
    <BackEndPage title="Videos">
      <div className="main-app">
        <TopMessage message="Uploaded Videos" />

        <section className="app-content">
          <section className="videos">
            <LoadItems
              items={videos}
              loadingText="Loading your Videos"
              noContent={<NoContent isButton text="No Team Videos found" />}
            >
              <div className="row">
                {(videos || []).map(({ id, youtubeID, title, approved }) => {
                  return (
                    <Video.Modal
                      id={id}
                      key={id}
                      status={getStatus(approved)}
                      title={title}
                      youtubeID={youtubeID}
                    />
                  );
                })}
              </div>
            </LoadItems>
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

Video.ModalCard.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeID: PropTypes.string.isRequired,
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

Video.YoutubeOverlay = () => (
  <div className="card-img-overlay">
    <div className="card-img-overlay__content">
      <span className="icon icon-video"></span>
    </div>
  </div>
);

Video.Modal = ({ youtubeID, status, title, id, showExtra }) => {
  const youtubeImage = (
    <Video.YoutubeImage title={title} youtubeID={youtubeID} />
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
          <Video.YoutubeOverlay />
        </DuvLiveModal>

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

export default Video;
