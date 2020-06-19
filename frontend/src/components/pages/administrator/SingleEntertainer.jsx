import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import classNames from 'classnames';
import Button from 'components/forms/Button';
import ProfileAvatar from 'assets/img/avatar/profile.png';

const SingleEntertainer = ({ slug }) => {
  const [entertainer, setEntertainer] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/v1/entertainer/${slug}`)
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
  }, [slug]);

  return (
    <BackEndPage title="Manage Entertainer">
      <div className="main-app">
        <TopMessage message="Entertainer Profile" />
        <section className="app-content">
          {entertainer && <EntertainerProfile entertainer={entertainer} />}
        </section>
      </div>
    </BackEndPage>
  );
};

const EntertainerProfile = ({ entertainer }) => (
  <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
    <section className="text-center">
      <Image
        className="avatar--large"
        name={(entertainer && entertainer.firstName) || 'No name'}
        responsiveImage={false}
        src={entertainer.profileImageURL || ProfileAvatar}
      />
      <h3 className="font-weight-normal">
        {entertainer.profile.stageName} <br />
      </h3>
    </section>
    <ul className={classNames('list-group  mt-4', { transparent: true })}>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-entertainer-circle"></i>
          Full Name
        </small>
        <h5 className="event-list-label">
          {entertainer.firstName} {entertainer.lastName}
        </h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-entertainer-circle"></i>
          Stage Name
        </small>
        <h5 className="event-list-label">{entertainer.profile.stageName}</h5>
      </li>
    </ul>
    <div className="mt-4">
      <Button className="btn-transparent btn-wide">Approve Entertainer</Button>
    </div>
  </div>
);

EntertainerProfile.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

SingleEntertainer.propTypes = {
  slug: PropTypes.any,
};
SingleEntertainer.defaultProps = {
  slug: '',
};

export default SingleEntertainer;
