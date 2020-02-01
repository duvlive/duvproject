import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import Image from 'components/common/utils/Image';
import BackEndPage from 'components/common/layout/BackEndPage';
import { UserContext } from 'context/UserContext';
import UploadGallery from 'components/common/utils/UploadGallery';

const Gallery = () => {
  const [gallery, setGallery] = React.useState([]);
  const { userState } = React.useContext(UserContext);

  // Load Gallery
  React.useEffect(() => {
    const { id } = userState;
    id &&
      axios
        .get(`/api/v1/gallery/${id}`)
        .then(function(response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            console.log('data', data);
            setGallery(data);
          }
        })
        .catch(function(error) {
          setGallery([]);
        });
  }, [userState]);

  const addImageToGallery = image => {
    setGallery([image, ...gallery]);
  };

  return (
    <BackEndPage title="Gallery">
      <div className="main-app">
        <TopMessage message="Gallery" />

        <section className="app-content">
          <section className="gallery">
            <UploadGallery afterSave={addImageToGallery} />
            <div className="row">
              {gallery.map(({ imageURL, id }, index) => (
                <Gallery.Card
                  key={id}
                  name={userState.firstName + index}
                  src={imageURL}
                />
              ))}
            </div>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

Gallery.Card = ({ src, name }) => (
  <div className="card col-lg-3 col-md-4 col-6 gallery-card-image">
    <div className="d-block mb-5 h-100">
      <Image
        bordered
        className="img-fluid"
        name={name}
        rounded={false}
        src={src}
      />
      <div className="card-img-overlay">
        <h5 className="card-title">Do you want to delete this image?</h5>
        <p className="card-text">
          <button className="btn-primary">Yes</button>
          <button className="btn-default">Yes</button>
        </p>
      </div>
      <div className="position-absolute">Delete Image</div>
    </div>
  </div>
);

Gallery.Card.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default Gallery;
