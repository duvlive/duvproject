import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { Link } from '@reach/router';
import Humanize from 'humanize-plus';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber } from 'utils/helpers';
import { getShortDate } from 'utils/date-helpers';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { addBadgeObject } from 'components/forms/schema/badgeSchema';
import { setInitialValues } from 'components/forms/form-helper';
import { Formik, Form } from 'formik';
import { getTokenFromStore } from 'utils/localStorage';
import Select from 'components/forms/Select';
import TextArea from 'components/forms/TextArea';
import { UserContext } from 'context/UserContext';

const Badges = () => {
  return (
    <BackEndPage title="Badges">
      <AdminList
        AddNewComponent={AddNewComponent}
        apiData="result"
        apiUrl="/api/v1/badges-all"
        pageName="Badge"
        tableRow={BadgesRow}
      />
    </BackEndPage>
  );
};

const BadgesRow = ({
  color,
  creator,
  id,
  title,
  number,
  createdAt,
  userBadges,
}) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className="align-middle">
      <small className="small--4 text-muted">Title</small>
      <span className={`table__title text-${color}-100`}>{title}</span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Assigned to </small>
      <span className="text-muted-light-2">
        {userBadges.length}{' '}
        {Humanize.pluralize(userBadges.length, 'Entertainer')}
      </span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Created On</small>
      <span className="text-muted-light-2">{getShortDate(createdAt)}</span>
    </td>

    <td className=" align-middle">
      <Image
        className="avatar--small"
        name={`${number}-badge`}
        responsiveImage={false}
        src={creator.profileImageURL || ProfileAvatar}
      />
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Added By</small>
      <span className="text-muted-light-2">
        {creator.firstName} {creator.lastName}
      </span>
    </td>

    <td className="align-middle">
      <Link
        className="btn btn-sm btn-transparent btn-danger"
        to={`/admin/badges/${id}`}
      >
        Manage
      </Link>
    </td>
  </tr>
);

BadgesRow.defaultProps = {
  color: null,
  title: null,
  createdAt: null,
  userBadges: [],
  creator: { firstName: null, lastName: null },
};

BadgesRow.propTypes = {
  color: PropTypes.string,
  createdAt: PropTypes.string,
  creator: PropTypes.object,
  id: PropTypes.any.isRequired,
  number: PropTypes.any.isRequired,
  title: PropTypes.string,
  userBadges: PropTypes.array,
};

export const AddNewComponent = ({ addData, setMessage }) => {
  const { userState } = React.useContext(UserContext);
  return (
    <Formik
      initialValues={setInitialValues(addBadgeObject)}
      onSubmit={(value, actions) => {
        axios
          .post('/api/v1/badge', value, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            if (status === 200) {
              console.log('data', data);
              addData({
                ...data.badge,
                creator: {
                  id: userState.id,
                  firstName: userState.firstName,
                  lastName: userState.lastName,
                  profileImageURL: userState.profileImg,
                },
                userBadges: [],
              });
              setMessage({ message: data.message, type: 'success' });
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            console.log('error', error);
            // console.log('error.response', error.response.data);
            // setMessage({ message: error.response.data.message });
            actions.setSubmitting(false);
          });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form className="card card-custom card-black card-form p-4">
          <>
            <h5 className="sub-title py-3">Add New Badge</h5>
            <div className="form-row">
              <Input
                formGroupClassName="col-md-6"
                label="Title"
                name="title"
                placeholder="Badge Title"
              />
              <Select
                blankOption="Select Color"
                formGroupClassName="col-md-6"
                label="Color"
                name="color"
                options={[
                  { value: 'blue', label: 'Blue Colour' },
                  { value: 'red', label: 'Red Colour' },
                  { value: 'green', label: 'Green Colour' },
                  { value: 'yellow', label: 'Yellow Colour' },
                ]}
                placeholder="Badge Title"
              />
            </div>
            <TextArea
              label="Description"
              name="description"
              optional
              placeholder="Description"
            />
            <div className="form-group">
              <Button
                color="danger"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Add Badge
              </Button>
            </div>
          </>
        </Form>
      )}
      validationSchema={createSchema(addBadgeObject)}
    />
  );
};

AddNewComponent.propTypes = {
  addData: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default Badges;
