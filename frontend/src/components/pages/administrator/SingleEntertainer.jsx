import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Row, Col } from 'reactstrap';
import Image from 'components/common/utils/Image';
import Badges from 'components/pages/entertainer/Badges';
// import classNames from 'classnames';
// import Button from 'components/forms/Button';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { getTokenFromStore } from 'utils/localStorage';
import {
  EntertainerSectionInfo,
  Gallery,
  Videos,
  ReviewSection,
} from 'components/pages/frontend/SingleEntertainer';

const SingleEntertainer = ({ id }) => {
  const [entertainer, setEntertainer] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/v1/admin/entertainer/${id}`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        if (status === 200) {
          setEntertainer(data.entertainer);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setEntertainer([]);
      });
  }, [id]);

  return (
    <BackEndPage title="Manage Entertainer">
      <div className="main-app">
        <TopMessage message="Entertainer Profile" />
        <section className="app-content">
          {entertainer && <EntertainerProfile entertainer={entertainer} />}
          {entertainer &&
            entertainer.profile &&
            entertainer.profile.approved && (
              <ApprovedEntertainerInfo entertainer={entertainer} />
            )}
        </section>
      </div>
    </BackEndPage>
  );
};

const EntertainerProfile = ({ entertainer }) => (
  <section>
    <EntertainerSection entertainer={entertainer} />
  </section>
);
EntertainerProfile.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const ApprovedEntertainerInfo = ({ entertainer }) => (
  <section>
    <div className="mt-5">
      <EntertainerSectionInfo entertainer={entertainer} showContentOnly />
    </div>

    {entertainer.badges && entertainer.badges.length > 0 && (
      <Awards badges={entertainer.badges} />
    )}

    {entertainer.galleries && entertainer.galleries.length > 0 && (
      <>
        <h4 className="mt-5 text-uppercase col-12 font-weight-normal mb-3">
          Gallery
        </h4>
        <Gallery galleries={entertainer.galleries} showContentOnly />
      </>
    )}

    {entertainer.videos && entertainer.videos.length > 0 && (
      <>
        <h4 className="mt-5 text-uppercase col-12 font-weight-normal mb-3">
          Videos
        </h4>
        <Videos showContentOnly videos={entertainer.videos} />
      </>
    )}
    {entertainer.profile &&
      entertainer.profile.ratings &&
      entertainer.profile.ratings.length > 0 && (
        <ReviewSection ratings={entertainer.profile.ratings} />
      )}
  </section>
);

ApprovedEntertainerInfo.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

SingleEntertainer.propTypes = {
  slug: PropTypes.any,
};
SingleEntertainer.defaultProps = {
  slug: '',
};

export const EntertainerSection = ({ entertainer }) => (
  <Row>
    <Col sm="12">
      <Image
        bordered
        className="avatar--large float-left mr-3"
        name={entertainer.firstName || 'No name'}
        rounded={false}
        src={entertainer.profileImageURL || ProfileAvatar}
      />
      <section className="entertainer__summary">
        <h4 className="text-capitalize">
          {entertainer.profile.stageName ||
            `${entertainer.firstName} ${entertainer.lastName}`}
        </h4>
        <div className="text-red">
          {entertainer.profile.entertainerType || 'NONE'}
        </div>
        <article>{entertainer.profile.about || '-'}</article>
      </section>
    </Col>
  </Row>
);

EntertainerSection.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const Awards = ({ badges }) => (
  <div className="row mt-5">
    <h4 className="text-uppercase col-12 font-weight-normal mb-3">Awards</h4>
    <Badges.CardLists badges={badges} />
  </div>
);

Awards.propTypes = {
  badges: PropTypes.array.isRequired,
};

export default SingleEntertainer;
