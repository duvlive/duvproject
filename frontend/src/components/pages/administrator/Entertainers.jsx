import React from 'react';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { Link } from '@reach/router';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber } from 'utils/helpers';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import { feedback } from 'components/forms/form-helper';
import { LANGUAGE, BUDGET, SELECT_ENTERTAINERS_TYPE } from 'utils/constants';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import { recommendEntertainerSchema } from 'components/forms/schema/entertainerSchema';
import { setInitialValues } from 'components/forms/form-helper';
import { getStates } from 'data/naija-states-and-lgas';

const Entertainers = () => {
  return (
    <BackEndPage title="Entertainers">
      <AdminList
        apiData="entertainers"
        apiUrl="/api/v1/entertainers-all"
        FilterComponent={EntertainerFilter}
        pageName="Entertainer"
        tableRow={EntertainersRow}
      />
    </BackEndPage>
  );
};

const EntertainersRow = ({
  approved,
  number,
  stageName,
  slug,
  entertainerId,
  entertainerType,
  profileImageURL,
  location,
  profileInfo,
  willingToTravel,
}) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className=" align-middle">
      <Image
        className="avatar--medium--small"
        name={`${number}-entertainer`}
        responsiveImage={false}
        src={profileImageURL || ProfileAvatar}
      />
    </td>
    <td className="align-middle">
      <small className="small--4 text-muted">Stage Name</small>
      <span className="table__title">{stageName || '-'}</span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Entertainer Type</small>
      <span className="text-muted-light-2">{entertainerType || '-'}</span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Location</small>
      <span className="text-muted-light-2">{location || '-'}</span>
    </td>

    <td className="align-middle">
      <small className="small--4 text-muted">Willing To Travel</small>
      {willingToTravel ? (
        <span className="text-muted-light text-uppercase">
          <i className="icon icon-ok-circled"></i> Yes{' '}
        </span>
      ) : (
        <span className="text-red text-uppercase">
          <i className="icon icon-cancel"></i> No{' '}
        </span>
      )}
    </td>

    <td className="align-middle">
      <small className="small--4 text-muted">Approved</small>
      {approved ? (
        <span className="text-green text-uppercase">
          <i className="icon icon-ok-circled"></i> Yes{' '}
        </span>
      ) : (
        <span className="text-red text-uppercase">
          <i className="icon icon-cancel"></i> No{' '}
        </span>
      )}
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Profile</small>
      <span className="text-muted-light-2">{profileInfo}/5</span>
    </td>

    <td className="align-middle">
      <Link
        className="btn btn-sm btn-transparent btn-danger"
        to={`/admin/entertainers/${entertainerId}`}
      >
        Manage
      </Link>
      {/* {slug && (
        <>
          &nbsp;&nbsp;
          <a
            className="btn btn-info btn-sm btn-transparent"
            href={`/entertainers/profile/${slug}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            View Profile
          </a>
        </>
      )} */}
    </td>
  </tr>
);

EntertainersRow.defaultProps = {
  approved: null,
  entertainerType: null,
  location: null,
  profileImageURL: null,
  profileInfo: '0',
  slug: null,
  stageName: null,
  willingToTravel: false,
};

EntertainersRow.propTypes = {
  approved: PropTypes.bool,
  entertainerId: PropTypes.any.isRequired,
  entertainerType: PropTypes.string,
  location: PropTypes.string,
  number: PropTypes.any.isRequired,
  profileImageURL: PropTypes.string,
  profileInfo: PropTypes.any,
  slug: PropTypes.string,
  stageName: PropTypes.string,
  willingToTravel: PropTypes.bool,
};

export const EntertainerFilter = ({ setFilterTerms }) => {
  const noBudget = { label: 'None', value: '0' };
  const anyState = { label: 'Any', value: 'Any' };
  return (
    <Formik
      initialValues={setInitialValues(recommendEntertainerSchema)}
      onSubmit={(value, actions) => {
        setFilterTerms(
          { ...value, language: JSON.stringify(value.language) },
          {
            approved: `Approved : ${value.approved}`,
            entertainerType: `Entertainer Type: ${value.entertainerType}`,
            language: `Language: ${value.language}`,
            lowestBudget: `Base Charge: ${value.lowestBudget}`,
            highestBudget: `Preferred Charge: ${value.highestBudget}`,
            location: `Location: ${value.location}`,
          }
        );
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form className="card card-custom card-black card-form p-4">
          <>
            <div className="form-row">
              <Select
                blankOption="Choose your preferred Entertainer Type"
                formGroupClassName="col-md-6"
                label="Entertainer Type"
                name="entertainerType"
                options={SELECT_ENTERTAINERS_TYPE}
                placeholder="Entertainer Type"
                showFeedback={feedback.ERROR}
              />{' '}
              <Select
                blankOption="Select Approval"
                formGroupClassName="col-md-6"
                label="Approved"
                name="approved"
                optional
                options={[
                  { label: 'Approved Entertainers', value: 'YES' },
                  { label: 'Unapproved Entertainers', value: 'NO' },
                ]}
                showFeedback={feedback.ERROR}
              />
            </div>
            <div className="form-row">
              <Select
                formGroupClassName="col-md-6"
                label="Base Charge (in Naira)"
                name="lowestBudget"
                optional
                options={[noBudget, ...BUDGET]}
                showFeedback={feedback.ERROR}
              />
              <Select
                formGroupClassName="col-md-6"
                label="Preferred Charges (in Naira)"
                name="highestBudget"
                optional
                options={[noBudget, ...BUDGET]}
                showFeedback={feedback.ERROR}
              />
            </div>
            <div className="form-row">
              <Select
                blankOption="Select State"
                formGroupClassName="col-md-6"
                label="Location"
                name="location"
                optional
                options={[anyState, ...getStates()]}
                showFeedback={feedback.ERROR}
              />
              <MultiSelect
                formGroupClassName="col-md-6"
                label="Language"
                name="language"
                optional
                options={LANGUAGE}
                placeholder="Preferred Language"
                showFeedback={feedback.ERROR}
              />
            </div>
            <div className="form-group">
              <Button
                color="danger"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Filter Entertainer
              </Button>
            </div>
          </>
        </Form>
      )}
    />
  );
};

EntertainerFilter.propTypes = {
  setFilterTerms: PropTypes.func.isRequired,
};

export default Entertainers;
