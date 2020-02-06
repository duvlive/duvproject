import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Input from 'components/forms/Input';
import TextArea from 'components/forms/TextArea';
import Select from 'components/forms/Select';
import { personalInfoObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import {
  setInitialValues,
  DisplayFormikState
} from 'components/forms/form-helper';
import { range, selectEntertainerType } from 'utils/helpers';
import AutoComplete from 'components/forms/AutoComplete';
import Button from 'components/forms/Button';
import { entertainerDetailsSchema } from 'components/forms/schema/entertainerSchema';
import UploadImage from 'components/common/utils/UploadImage';
import { BUDGET } from 'utils/constants';
import AlertMessage from 'components/common/utils/AlertMessage';
// import { UserContext } from 'context/UserContext';
import { getToken } from 'utils/localStorage';

const currentYear = new Date().getFullYear();

const RegisterAsEntertainer = () => {
  return (
    <BackEndPage title="Edit Profile">
      <div className="main-app">
        <TopMessage message="Edit Profile" />
        <section className="app-content">
          <EntertainerInfoForm />
        </section>
      </div>
    </BackEndPage>
  );
};

export const EntertainerInfoForm = () => {
  const [message, setMessage] = React.useState(null);
  // const { userState, userDispatch } = React.useContext(UserContext);
  return (
    <Formik
      initialValues={{
        entertainer: setInitialValues(entertainerDetailsSchema, {
          available_for: [
            { id: 1, name: 'Birthdays' },
            { id: 2, name: 'Weddings' }
          ]
        }),
        personal: setInitialValues(personalInfoObject)
      }}
      onSubmit={(values, actions) => {
        axios
          .put('/api/v1/users/editUser', values, {
            headers: { 'x-access-token': getToken() }
          })
          .then(function(response) {
            const { status, data } = response;
            console.log('status', status);
            console.log('data', data);
            // handle success
            console.log(status, data);
            if (status === 200) {
              // userDispatch({
              //   type: 'user-profile-update',
              //   user: data
              // });
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
        <>
          <AlertMessage {...message} />
          <EntertainerDetailsForm />
          <PersonalInfoForm />
          <DisplayFormikState {...props} />
          <Button
            className="btn-danger btn-lg btn-wide btn-transparent"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Update Profile
          </Button>
        </>
      )}
      validationSchema={createSchema({
        entertainer: createSchema(entertainerDetailsSchema),
        personal: createSchema(personalInfoObject)
      })}
    />
  );
};

const PersonalInfoForm = () => (
  <div className="card card-custom card-black card-form ">
    <div className="card-body col-md-10">
      <h4 className="card-title yellow">Personal Information</h4>
      <Form>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="First Name looks good"
            label="First Name"
            name="personal.firstName"
            placeholder="First Name"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Last Name looks good"
            label="Last Name"
            name="personal.lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Phone number looks good"
            label="Phone"
            name="personal.phoneNumber"
            placeholder="Phone"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Phone number looks good"
            label="Phone2"
            name="personal.phoneNumber2"
            optional
            placeholder="Phone"
          />
        </div>
      </Form>
    </div>
  </div>
);

const EntertainerDetailsForm = () => (
  <div className="card card-custom card-black card-form ">
    <div className="card-body col-md-10">
      <h4 className="card-title yellow">Entertainers Information</h4>
      <Form>
        <section className="mb-5">
          <UploadImage />
        </section>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Stage Name looks good"
            label="Stage Name"
            name="entertainer.stageName"
            placeholder="Stage Name"
          />
          <Select
            blankOption="Entertainer Type"
            formGroupClassName="col-md-6"
            label="Entertainer Type"
            name="entertainer.type"
            options={selectEntertainerType()}
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Location looks good"
            label="Location"
            name="entertainer.location"
            placeholder="Location"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="City looks good"
            label="City"
            name="entertainer.city"
            placeholder="City"
          />
        </div>
        <div className="form-row">
          <Select
            blankOption="Choose your base charges"
            formGroupClassName="col-md-6"
            isValidMessage="looks good"
            label="Base Charges (in Naira)"
            name="entertainer.baseCharges"
            options={BUDGET}
            placeholder="Base Charges"
          />
          <Select
            blankOption="Choose your highest charges"
            formGroupClassName="col-md-6"
            isValidMessage="looks good"
            label="Preferred Charges (in Naira)"
            name="entertainer.preferredCharges"
            options={BUDGET}
            placeholder="Preferred Charges"
          />
        </div>
        <div className="form-row">
          <Select
            blankOption="Select Option"
            formGroupClassName="col-md-6"
            label="Willing to Travel to other states for shows"
            name="entertainer.willingToTravel"
            options={[{ label: 'Yes' }, { label: 'No' }]}
          />
          <Select
            blankOption="Year Started"
            formGroupClassName="col-md-6"
            label="Year you started"
            name="entertainer.yearStarted"
            options={range(currentYear, currentYear - 20, -1).map(year => ({
              label: year
            }))}
          />
        </div>
        <AutoComplete
          label="Available for"
          name="entertainer.available_for"
          suggestions={[
            { id: 3, name: 'Yoruba Party' },
            { id: 4, name: 'Party' },
            { id: 5, name: 'Weddings' },
            { id: 6, name: 'Aniversary' }
          ]}
        />
        <TextArea
          label="About"
          name="entertainer.about"
          optional
          placeholder="Write some interesting facts about you."
          rows="8"
          type="textarea"
        />
      </Form>
    </div>
  </div>
);

export default RegisterAsEntertainer;
