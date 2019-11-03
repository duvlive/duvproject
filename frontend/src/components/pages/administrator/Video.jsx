import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';

const Video = () => (
  <BackEndPage title="Videos">
    <div className="main-app">
      <TopMessage message="Videos" />

      <section className="app-content">
        <section className="gallery">
          <div className="row">
            <Video.Card
              src="https://www.youtube.com/embed/LX0XMqjjzFA"
              title="DJ Cuppy in the  mix"
            />
            <Video.Card
              src="https://www.youtube.com/embed/sUNyzg8O6dk"
              title="Cuppy Ft L.A.X - Currency (Official Video)"
            />
            <Video.Card
              src="https://www.youtube.com/embed/XJteFC9jqVM"
              title="Abena - DJ Cuppy"
            />
            <Video.Card
              src="https://www.youtube.com/embed/osvde7xNQ0s"
              title="Cuppy &amp; Tekno - Green Light (Official Video)"
            />
            <Video.Card
              src="https://www.youtube.com/embed/RxzyXOUSRQM"
              title="Cuppy on a Mission"
            />
          </div>
        </section>
      </section>
    </div>
  </BackEndPage>
);

Video.Card = ({ src, title }) => (
  <div className="col-md-4 col-6 mb-5">
    <div class="embed-responsive embed-responsive-16by9">
      <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        frameborder="0"
        src={src}
        title={title}
      ></iframe>
    </div>
  </div>
);

//TODO: WORK ON REWRITE THE URL TO EMBEDDED FORMAT

Video.Card.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Video;
