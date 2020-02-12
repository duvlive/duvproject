import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Input from 'components/forms/Input';
import TextArea from 'components/forms/TextArea';
import Select from 'components/forms/Select';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import { range, selectEntertainerType } from 'utils/helpers';
import AutoComplete from 'components/forms/AutoComplete';
import Button from 'components/forms/Button';
import {
  entertainerDetailsSchema,
  youtubeChannelSchema,
  identificationSchema
} from 'components/forms/schema/entertainerSchema';
import UploadImage from 'components/common/utils/UploadImage';
import { BUDGET, ONBOARDING_STEPS } from 'utils/constants';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';
import { getToken } from 'utils/localStorage';
import DynamicSelect from 'components/forms/DynamicSelect';
import { getStates, getLgas } from 'data/naija-states-and-lgas';
import DatePicker from 'components/forms/DatePicker';

const currentYear = new Date().getFullYear();

const RegisterAsEntertainer = () => {
  return (
    <BackEndPage title="Edit Profile">
      <div className="main-app">
        <TopMessage message="Edit Profile" />
        <section className="app-content">
          <EntertainerDetailsForm />
          <YoutubeChannelForm />
          <IdentificationForm />
        </section>
      </div>
    </BackEndPage>
  );
};

export const EntertainerDetailsForm = () => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(entertainerDetailsSchema, {
        ...userState.entertainerProfile,
        availableFor: JSON.parse(userState.entertainerProfile.availableFor)
      })}
      onSubmit={(values, actions) => {
        const availableFor = JSON.stringify(values.availableFor);
        const payload = { ...values, availableFor };
        axios
          .put('/api/v1/users/updateEntertainerProfile', payload, {
            headers: { 'x-access-token': getToken() }
          })
          .then(function(response) {
            const { status, data } = response;
            console.log('status', status);
            console.log('data', data);
            // handle success
            console.log(status, data);
            if (status === 200) {
              userDispatch({
                type: 'entertainer-profile-update',
                user: data
              });
              setMessage({
                type: 'success',
                message: `Your profile has been successfully updated`
              });
              actions.setSubmitting(false);
            }
          })
          .catch(function(error) {
            console.log('error', error);
            setMessage(error.response.data.message);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title yellow">
              {ONBOARDING_STEPS.entertainerProfile.title}
            </h4>
            <Form>
              <AlertMessage {...message} />
              <section className="mb-5">
                <UploadImage />
              </section>
              <div className="form-row">
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Stage Name looks good"
                  label="Stage Name"
                  name="stageName"
                  placeholder="Stage Name"
                />
                <Select
                  blankOption="Entertainer Type"
                  formGroupClassName="col-md-6"
                  label="Entertainer Type"
                  name="entertainerType"
                  options={selectEntertainerType()}
                />
              </div>
              <div className="form-row">
                <Select
                  blankOption="Select Location"
                  formGroupClassName="col-md-6"
                  isValidMessage="looks good"
                  label="Location"
                  name="location"
                  options={getStates()}
                  placeholder="Location (in Nigeria)"
                />
                <DynamicSelect
                  blankOption="Select City"
                  dependentOn="location"
                  formGroupClassName="col-md-6"
                  isValidMessage="looks good"
                  label="City"
                  name="city"
                  options={getLgas}
                  placeholder="City"
                />
              </div>
              <div className="form-row">
                <Select
                  blankOption="Choose your base charges"
                  formGroupClassName="col-md-6"
                  isValidMessage="looks good"
                  label="Base Charges (in Naira)"
                  name="baseCharges"
                  options={BUDGET}
                  placeholder="Base Charges"
                />
                <Select
                  blankOption="Choose your highest charges"
                  formGroupClassName="col-md-6"
                  isValidMessage="looks good"
                  label="Preferred Charges (in Naira)"
                  name="preferredCharges"
                  options={BUDGET}
                  placeholder="Preferred Charges"
                />
              </div>
              <div className="form-row">
                <Select
                  blankOption="Select Option"
                  formGroupClassName="col-md-6"
                  label="Willing to Travel to other states for shows"
                  name="willingToTravel"
                  options={[
                    {
                      label: 'Yes, I can move to other states for events',
                      value: true
                    },
                    {
                      label: 'No, I prefer events in my location only',
                      value: false
                    }
                  ]}
                />
                <Select
                  blankOption="Year Started"
                  formGroupClassName="col-md-6"
                  label="Year you started"
                  name="yearStarted"
                  options={range(currentYear, currentYear - 20, -1).map(
                    year => ({
                      label: year
                    })
                  )}
                />
              </div>
              <AutoComplete
                label="Available for"
                name="availableFor"
                suggestions={[
                  { id: 3, name: 'Yoruba Party' },
                  { id: 4, name: 'Party' },
                  { id: 5, name: 'Weddings' },
                  { id: 6, name: 'Aniversary' }
                ]}
              />
              <TextArea
                label="About"
                name="about"
                optional
                placeholder="Write some interesting facts about you."
                rows="8"
                type="textarea"
              />
              <Button
                className="btn-danger btn-wide btn-transparent"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Update Profile
              </Button>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(entertainerDetailsSchema)}
    />
  );
};

export const YoutubeChannelForm = () => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(youtubeChannelSchema, {
        ...userState.entertainerProfile
      })}
      onSubmit={(values, actions) => {
        axios
          .put('/api/v1/users/updateEntertainerProfile', values, {
            headers: { 'x-access-token': getToken() }
          })
          .then(function(response) {
            const { status, data } = response;
            // handle success
            console.log(status, data);
            if (status === 200) {
              userDispatch({
                type: 'entertainer-youtube-channel',
                user: data
              });
              setMessage({
                type: 'success',
                message: `Your youtube channel has been successfully updated`
              });
              actions.setSubmitting(false);
            }
          })
          .catch(function(error) {
            console.log('error', error);
            setMessage(error.response.data.message);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title yellow">
              {ONBOARDING_STEPS.youTube.title}
            </h4>
            <Form>
              <AlertMessage {...message} />
              <Input
                isValidMessage="Youtube URL looks good"
                label="Youtube Channel"
                name="youTubeChannel"
                placeholder="Youtube Channel URL"
              />

              <Button
                className="btn-danger btn-wide btn-transparent"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Update Youtube Channel
              </Button>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(youtubeChannelSchema)}
    />
  );
};

export const IdentificationForm = () => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(identificationSchema, {
        ...userState.identification
      })}
      onSubmit={(values, actions) => {
        const payload = {
          ...values,
          expiryDate: values.expiryDate.date,
          issueDate: values.issueDate.date
        };
        console.log('payload', payload);
        axios
          .put('/api/v1/identification', payload, {
            headers: { 'x-access-token': getToken() }
          })
          .then(function(response) {
            const { status, data } = response;
            console.log('status', status);
            console.log('data', data);
            // handle success
            console.log(status, data);
            if (status === 200) {
              userDispatch({
                type: 'entertainer-identification',
                user: data
              });
              setMessage({
                type: 'success',
                message: `Your identification has been successfully updated`
              });
              actions.setSubmitting(false);
            }
          })
          .catch(function(error) {
            console.log('error', error);
            setMessage(error.response.data.message);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title yellow">
              {ONBOARDING_STEPS.identification.title}
            </h4>
            <Form>
              <AlertMessage {...message} />
              <div className="form-row">
                <Select
                  blankOption="ID Type"
                  formGroupClassName="col-md-6"
                  label="ID Type"
                  name="idType"
                  options={[
                    { label: 'International Passport' },
                    { label: 'Driver Licence' },
                    { label: 'National ID Card' }
                  ]}
                />
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="ID Number looks good"
                  label="ID Number"
                  name="idNumber"
                  placeholder="ID Number"
                />
              </div>
              <div className="form-row">
                <DatePicker
                  formGroupClassName="col-md-6"
                  isValidMessage="Issue Date looks good"
                  label="Issue Date"
                  name="issueDate"
                  placeholder="Issue Date"
                />
                <DatePicker
                  formGroupClassName="col-md-6"
                  isValidMessage="Expiry Date looks good"
                  label="Expiry Date"
                  name="expiryDate"
                  placeholder="Expiry Date"
                />
              </div>
              <Button
                className="btn-danger btn-wide btn-transparent"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Update Identification
              </Button>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(identificationSchema)}
    />
  );
};

export default RegisterAsEntertainer;
