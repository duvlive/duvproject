import React from 'react';
import PropTypes from 'prop-types';
import Image1 from 'assets/img/gallery/DjCuppy1.jpg';
import Image2 from 'assets/img/gallery/DjCuppy2.jpg';
import Image3 from 'assets/img/gallery/DjCuppy3.jpg';
import Image4 from 'assets/img/gallery/DjCuppy4.jpg';
import Image5 from 'assets/img/gallery/DjCuppy5.jpg';
import Image6 from 'assets/img/gallery/DjCuppy6.jpg';
import TopMessage from 'components/common/layout/TopMessage';
import Image from 'components/common/utils/Image';
import BackEndPage from 'components/common/layout/BackEndPage';

const Gallery = () => (
  <BackEndPage title="Team Gallery">
    <div className="main-app">
      <TopMessage message="Team Gallery" />

      <section className="app-content">
        <section className="gallery">
          <div className="row">
            <Gallery.Card image={Image1} name="image1" />
            <Gallery.Card image={Image2} name="image2" />
            <Gallery.Card image={Image3} name="image3" />
            <Gallery.Card image={Image4} name="image4" />
            <Gallery.Card image={Image5} name="image5" />
            <Gallery.Card image={Image6} name="image6" />
          </div>
        </section>
      </section>
    </div>
  </BackEndPage>
);

Gallery.Card = ({ image }) => (
  <div className="col-lg-3 col-md-4 col-6">
    <div className="d-block mb-5 h-100">
      <Image bordered className="img-fluid" rounded={false} src={image} />
    </div>
  </div>
);

Gallery.Card.propTypes = {
  image: PropTypes.string.isRequired
};

export default Gallery;
