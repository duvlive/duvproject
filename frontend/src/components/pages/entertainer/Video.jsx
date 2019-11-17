import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DuvLiveModal from 'components/custom/Modal';

const Video = () => {
  const videos = [
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
  return (
    <BackEndPage title="Videos">
      <div className="main-app">
        <TopMessage message="Videos" />

        <section className="app-content">
          <section className="gallery">
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
  <div class="embed-responsive embed-responsive-16by9">
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

Video.Card.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired
};

Video.Modal.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired
};

export default Video;
