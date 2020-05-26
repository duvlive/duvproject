import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import Image from 'components/common/utils/Image';
import BackEndPage from 'components/common/layout/BackEndPage';
import { UserContext } from 'context/UserContext';
import UploadGallery from 'components/common/utils/UploadGallery';
import DuvLiveModal from 'components/custom/Modal';
import { getTokenFromStore } from 'utils/localStorage';

export const approval = {
  approved: {
    color: 'success',
    text: 'Approved',
  },
  rejected: {
    color: 'danger',
    text: 'Rejected',
  },
  pending: {
    color: 'info',
    text: 'Pending',
  },
};

export const getStatus = (status) => {
  /* == is used to check for null
   * null -> pending
   * true -> approved
   * false -> rejected
   */
  if (null == status) {
    return 'pending';
  }
  return !!status ? 'approved' : 'rejected';
};

const Gallery = () => {
  const [gallery, setGallery] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const { userDispatch, userState } = React.useContext(UserContext);

  const handleDelete = (id) => {
    axios
      .delete(`/api/v1/gallery/delete/${id}`)
      .then(function (response) {
        const { status } = response;
        // handle success
        if (status === 202) {
          const currentImages = gallery.filter((g) => g.id !== id);
          setGallery(currentImages);
          setMessage('Your image has been successfully deleted');
        }
      })
      .catch(function (error) {
        setGallery([]);
      });
  };

  const setAsProfile = (imageURL) => {
    const values = { profileImageURL: imageURL };
    axios
      .put(`/api/v1/gallery/set-as-profile`, values, {
        headers: { 'x-access-token': getTokenFromStore() },
      })
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          userDispatch({
            type: 'update-user-profile-image',
            imageURL: data.profileImageURL,
          });
        }
      })
      .catch(function (error) {
        setGallery([]);
      });
  };

  // Load Gallery
  React.useEffect(() => {
    userState.galleries && setGallery(userState.galleries);
  }, [userState]);

  const addImageToGallery = (image) => {
    setGallery([image, ...gallery]);
  };

  const isCurrentProfileImage = (imageURL) => userState.profileImg === imageURL;
  return (
    <BackEndPage title="Gallery">
      <div className="main-app">
        <TopMessage message="Gallery" />

        <section className="app-content">
          <section className="gallery">
            <UploadGallery
              afterSave={addImageToGallery}
              deleteMessage={message}
            />
            <div className="row">
              {gallery.map(({ imageURL, id, approved }, index) => (
                <GalleryCard
                  deleteImage={handleDelete}
                  id={id}
                  isCurrentProfileImage={isCurrentProfileImage(imageURL)}
                  key={id}
                  name={userState.firstName + index}
                  setAsProfile={setAsProfile}
                  src={imageURL}
                  status={getStatus(approved)}
                />
              ))}
            </div>
            {gallery && gallery.length > 0 && (
              <div className="row">
                <div className="col-12 mt-5">
                  <p className="text-muted-light">
                    Note: Gallery images must be approved by an administrator
                    before they are shown on your profile.
                  </p>
                </div>
              </div>
            )}
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

const GalleryCard = ({
  setAsProfile,
  deleteImage,
  id,
  isCurrentProfileImage,
  src,
  name,
  status,
}) => {
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
        actionFn={() => setAsProfile(src)}
        actionText={
          !isCurrentProfileImage && status === 'approved'
            ? 'Set as Profile Image'
            : null
        }
        body={
          <>
            {isCurrentProfileImage && <h2>Current Profile Image</h2>}
            <Image.Big
              className="img-fluid"
              name={name}
              rounded={false}
              src={src}
            />
          </>
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
        {isCurrentProfileImage ? (
          <div className="profile-icon">
            <span className="icon icon-user-circle"></span>
          </div>
        ) : (
          <div className="delete-icon">
            <span className="icon icon-cancel-circled"></span>
          </div>
        )}
      </DuvLiveModal>
    </div>
  );
};

GalleryCard.propTypes = {
  deleteImage: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isCurrentProfileImage: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  setAsProfile: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  status: PropTypes.any.isRequired,
};

export default Gallery;
