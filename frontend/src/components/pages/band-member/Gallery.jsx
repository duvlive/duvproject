import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import Image from 'components/common/utils/Image';
import BackEndPage from 'components/common/layout/BackEndPage';
import DuvLiveModal from 'components/custom/Modal';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/common/utils/LoadItems';
import NoContent from 'components/common/utils/NoContent';

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
  const [gallery, setGallery] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('/api/v1/gallery/bandMember', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          setGallery(data.images);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setGallery([]);
      });
  }, []);

  return (
    <BackEndPage title="Team Gallery">
      <div className="main-app">
        <TopMessage message="Team Gallery" />

        <section className="app-content">
          <section className="gallery">
            <LoadItems
              items={gallery}
              loadingText="Loading your Videos"
              noContent={<NoContent isButton text="No Team Gallery found" />}
            >
              <div className="row">
                {(gallery || []).map(({ imageURL, id, approved }, index) => (
                  <GalleryCard
                    id={id}
                    key={id}
                    name={'band' + index}
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
            </LoadItems>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

const GalleryCard = ({ id, src, name, status }) => {
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
          <>
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
    </div>
  );
};

GalleryCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  status: PropTypes.any.isRequired,
};

export default Gallery;
