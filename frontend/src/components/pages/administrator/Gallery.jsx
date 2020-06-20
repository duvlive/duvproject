import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { Link } from '@reach/router';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber } from 'utils/helpers';
import { approval, getStatus } from 'components/pages/entertainer/Gallery';

import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import Select from 'components/forms/Select';
import { getTokenFromStore } from 'utils/localStorage';

const Gallery = () => {
  return (
    <BackEndPage title="Gallery">
      <AdminList
        FilterComponent={GalleryFilter}
        apiData="result"
        apiUrl="/api/v1/gallery-all"
        pageName="Gallery"
        pluralPageName="Gallery"
        tableRow={GalleryRow}
      />
    </BackEndPage>
  );
};

const GalleryRow = ({ approved, id, number, imageURL, user }) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className=" align-middle">
      <Image
        className="avatar--medium"
        name={`gallery-${number}`}
        responsiveImage={false}
        rounded={false}
        src={imageURL}
      />
    </td>
    <td className="align-middle">
      <small className="small--4 text-muted">Stage Name</small>
      <span className="table__title">{user.profile.stageName || '-'}</span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Status</small>
      <span className="text-muted-light-2">
        {approval[getStatus(approved)].text}
      </span>
    </td>

    <td className=" align-middle">
      <Image
        className="avatar--medium--small"
        name={`${number}-entertainer`}
        responsiveImage={false}
        src={user.profileImageURL || ProfileAvatar}
      />
    </td>

    <td className="align-middle">
      <Link
        className="btn btn-sm btn-transparent btn-danger"
        to={`/admin/gallery/${id}`}
      >
        Manage
      </Link>
    </td>
  </tr>
);

GalleryRow.defaultProps = {
  approved: null,
  number: null,
  imageURL: null,
  user: null,
};

GalleryRow.propTypes = {
  approved: PropTypes.bool,
  id: PropTypes.any.isRequired,
  imageURL: PropTypes.string,
  number: PropTypes.any.isRequired,
  user: PropTypes.object,
};

export const GalleryFilter = ({ setFilterTerms }) => {
  const [entertainers, setEntertainers] = React.useState([]);
  React.useEffect(() => {
    axios.get(`/api/v1/admin/entertainers-list`, {
      headers: {
        'x-access-token': getTokenFromStore(),
      }
    }).then(function (response) {
      const { status, data } = response;
      // handle success
      if (status === 200) {
        setEntertainers(data.entertainers);
      }
    })
      .catch(function (error) {
        setEntertainers([]);
      });
  }, []);
  const GALLERY_STATE = [
    { label: 'Any' },
    { label: 'Pending' },
    { label: 'Approved' },
    { label: 'Rejected' }
  ];
  return (
    <Formik
      initialValues={{
        approved: 'Any',
        userId: ''
      }}
      onSubmit={({ approved, userId }, actions) => {
        setFilterTerms({ approved, userId });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form className="card card-custom card-black card-form p-4">
          <>
            <div className="form-row">
              <Select
                formGroupClassName="col-md-6"
                label="Approval State"
                name="approved"
                options={GALLERY_STATE}
                placeholder="Gallery Type"
              />
              <Select
                blankOption="Select Entertainer"
                formGroupClassName="col-md-6"
                label="Entertainer"
                name="userId"
                options={entertainers}
                placeholder="Select Entertainer"
              />
            </div>
            <div className="form-group">
              <Button
                color="danger"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Filter Gallery
              </Button>
            </div>
          </>
        </Form>
      )}
    />
  );
};

GalleryFilter.propTypes = {
  setFilterTerms: PropTypes.func.isRequired,
};

export default Gallery;
