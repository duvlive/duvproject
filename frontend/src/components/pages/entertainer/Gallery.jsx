import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import Image from 'components/common/utils/Image';
import BackEndPage from 'components/common/layout/BackEndPage';
import { UserContext } from 'context/UserContext';
import UploadGallery from 'components/common/utils/UploadGallery';
import DuvLiveModal from 'components/custom/Modal';

const approval = {
  approved: {
    color: 'success',
    text: 'Approved'
  },
  rejected: {
    color: 'danger',
    text: 'Rejected'
  },
  pending: {
    color: 'info',
    text: 'Pending'
  }
};

const getStatus = status => {
  // need == to check for null
  if (null == status) {
    return 'pending';
  }
  return !!status ? 'approved' : 'rejected';
};

const Gallery = () => {
  const [gallery, setGallery] = React.useState([]);
  const { userState } = React.useContext(UserContext);

  const handleDelete = id => {
    axios
      .delete(`/api/v1/gallery/delete/${id}`)
      .then(function(response) {
        const { status, data } = response;
        // handle success
        if (status === 202) {
          console.log('data', data);
          const currentImages = gallery.filter(g => g.id !== id);
          console.log('currentImages', currentImages);
          setGallery(currentImages);
        }
      })
      .catch(function(error) {
        setGallery([]);
      });
  };

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
              {gallery.map(({ imageURL, id, approved }, index) => (
                <GalleryCard
                  deleteImage={handleDelete}
                  id={id}
                  key={id}
                  name={userState.firstName + index}
                  src={imageURL}
                  status={getStatus(approved)}
                />
              ))}
            </div>
            <div className="row">
              <div className="col-12 mt-5">
                <p class="text-info">
                  Note: Gallery images must be approved by an administrator
                  before they are shown on your profile.
                </p>
              </div>
            </div>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

const GalleryCard = ({ deleteImage, id, src, name, status }) => {
  const currentImage = (
    <Image
      bordered
      className="img-fluid small"
      name={name}
      rounded={false}
      src={src}
    />
  );
  return (
    <div className="card col-lg-3 col-md-4 col-6 gallery-card-image">
      <DuvLiveModal
        body={
          <Image.Big
            className="img-fluid"
            name={name}
            rounded={false}
            src={src}
          />
        }
      >
        {currentImage}
        <small
          className={`badge badge-${approval[status].color} transparent-${approval[status].color}`}
        >
          {approval[status].text}
        </small>
      </DuvLiveModal>
      <DuvLiveModal
        actionFn={() => deleteImage(id)}
        actionText="Yes, Delete Image"
        body={currentImage}
        closeModalText="Cancel"
        title="Delete Image"
      >
        <div className="delete-icon">
          <span className="icon icon-cancel-circled"></span>
        </div>
      </DuvLiveModal>
    </div>
  );
};

GalleryCard.propTypes = {
  deleteImage: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  status: PropTypes.any.isRequired
};

export default Gallery;
