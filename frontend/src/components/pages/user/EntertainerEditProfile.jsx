import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import TextArea from 'components/forms/TextArea';
import Select from 'components/forms/Select';
// import Button from 'components/forms/Button';
import { personalInfoObject } from 'components/forms/schema/userSchema';
import { navigate } from '@reach/router';
import { setInitialValues } from 'components/forms/form-helper';
import { range } from 'utils/helpers';
import AutoComplete from 'components/forms/AutoComplete';
import { createSchema } from 'components/forms/schema/schema-helpers';

const currentYear = new Date().getFullYear();

const RegisterAsEntertainer = () => {
  return (
    <BackEndPage title="Edit Profile">
      <div className="main-app">
        <TopMessage message="Edit Profile" />

        <section className="app-content">
          <RegisterAsEntertainerForm />
        </section>
      </div>
    </BackEndPage>
  );
};

const RegisterAsEntertainerForm = () => {
  return (
    <Formik
      initialValues={setInitialValues(personalInfoObject)}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
          const { email, password } = values;
          if (email === 'user@duvlive.com' && password === 'passworded') {
            return navigate('/user/dashboard');
          }
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <>
          <PersonalInfoForm />
          <EntertainerDetailsForm />
          <BankDetailsForm />
        </>
      )}
      validationSchema={createSchema(personalInfoObject)}
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
            name="first_name"
            placeholder="First Name"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Last Name looks good"
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Email address seems valid"
            label="Email"
            name="email"
            placeholder="Email Address"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Phone number looks good"
            label="Phone"
            name="phone"
            placeholder="Phone"
          />
        </div>
        <TextArea
          label="About"
          name="about"
          placeholder="Write some interesting facts about you."
          rows="8"
          type="textarea"
        />
      </Form>
    </div>
  </div>
);

const EntertainerDetailsForm = () => (
  <div className="card card-custom card-black card-form ">
    <div className="card-body col-md-10">
      <h4 className="card-title yellow">Entertainers Details</h4>
      <Form>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Stage Name looks good"
            label="Stage Name"
            name="stageName"
            placeholder="Stage Name"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Location looks good"
            label="Location"
            name="location"
            placeholder="Location"
          />
        </div>
        <div className="form-row">
          <Select
            blankOption="Select Year"
            formGroupClassName="col-md-6"
            label="Year you started"
            name="started_year"
            options={range(currentYear, currentYear - 20, -1).map(year => ({
              label: year
            }))}
          />
          <Select
            blankOption="Select Option"
            formGroupClassName="col-md-6"
            label="Willing to Travel"
            name="started_year"
            options={[{ label: 'Yes' }, { label: 'No' }]}
          />
        </div>
        <AutoComplete
          label="Available for"
          name="autocomplete"
          suggestions={[
            { id: 3, name: 'Bananas' },
            { id: 4, name: 'Mangos' },
            { id: 5, name: 'Lemons' },
            { id: 6, name: 'Apricots', disabled: true }
          ]}
          value={[
            { id: 1, name: 'Apples' },
            { id: 2, name: 'Pears' }
          ]}
        />
      </Form>
    </div>
  </div>
);

const BankDetailsForm = () => (
  <div className="card card-custom card-black card-form ">
    <div className="card-body col-md-10">
      <h4 className="card-title yellow">Entertainers Details</h4>
      <Form>
        <div className="row">
          <div className="col-md-6">
            <Input
              isValidMessage="Stage Name looks good"
              label="Stage Name"
              name="stageName"
              placeholder="Stage Name"
            />
            <Input
              isValidMessage="Stage Name looks good"
              label="Stage Name"
              name="stageName"
              placeholder="Stage Name"
            />
            <Input
              isValidMessage="Stage Name looks good"
              label="Stage Name"
              name="stageName"
              placeholder="Stage Name"
            />
          </div>
          <div className="col-md-6">
            <p>Note:</p>
            <p>
              For payments to be made, your account name must tally with your
              first name and last name or stage name.
            </p>
            <p>
              Details on how we pay and when we pay would be explained here.
              Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
              Suspendisse urna nibh, viverra non, semper suscipit, posuere a,
              pede.
            </p>
          </div>
        </div>
      </Form>
    </div>
  </div>
);

export default RegisterAsEntertainer;
