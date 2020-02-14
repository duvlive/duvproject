import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import { getStates, getLgas } from 'data/naija-states-and-lgas';
import { SELECT_ENTERTAINERS_TYPE } from 'utils/constants';
import Select from 'components/forms/Select';
import DynamicSelect from 'components/forms/DynamicSelect';
import { personalInfoObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import {
  setInitialValues
  // DisplayFormikState
} from 'components/forms/form-helper';
import { range } from 'utils/helpers';
import AutoComplete from 'components/forms/AutoComplete';
import Button from 'components/forms/Button';
import { entertainerDetailsSchema } from 'components/forms/schema/entertainerSchema';

const currentYear = new Date().getFullYear();

const RegisterAsEntertainer = () => {
  return (
    <BackEndPage title="Register as an Entertainer">
      <div className="main-app">
        <TopMessage message="Register as an Entertainer" />
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
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          {/* <PersonalInfoForm /> */}
          <EntertainerDetailsForm />
          <Button
            className="btn-danger btn-lg btn-wide btn-transparent"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Register as an Entertainer
          </Button>

          {/* <DisplayFormikState {...props} /> */}
        </>
      )}
      validationSchema={createSchema({
        entertainer: createSchema(entertainerDetailsSchema),
        personal: createSchema(personalInfoObject)
      })}
    />
  );
};

// const PersonalInfoForm = () => (
//   <div className="card card-custom card-black card-form ">
//     <div className="card-body col-md-10">
//       <h4 className="card-title yellow">Personal Information</h4>
//       <Form>
//         <div className="form-row">
//           <Input
//             formGroupClassName="col-md-6"
//             isValidMessage="First Name looks good"
//             label="First Name"
//             name="personal.first_name"
//             placeholder="First Name"
//           />
//           <Input
//             formGroupClassName="col-md-6"
//             isValidMessage="Last Name looks good"
//             label="Last Name"
//             name="personal.last_name"
//             placeholder="Last Name"
//           />
//         </div>
//         <div className="form-row">
//           <Input
//             formGroupClassName="col-md-6"
//             isValidMessage="Email address seems valid"
//             label="Email"
//             name="personal.email"
//             placeholder="Email Address"
//           />
//           <Input
//             formGroupClassName="col-md-6"
//             isValidMessage="Phone number looks good"
//             label="Phone"
//             name="personal.phone"
//             placeholder="Phone"
//           />
//         </div>
//         <TextArea
//           label="About"
//           name="personal.about"
//           placeholder="Write some interesting facts about you."
//           rows="8"
//           type="textarea"
//         />
//       </Form>
//     </div>
//   </div>
// );

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
            name="entertainer.stage_name"
            placeholder="Stage Name"
          />
          <Select
            blankOption="Entertainer Type"
            formGroupClassName="col-md-6"
            isValidMessage="looks good"
            label="Entertainer Type"
            name="type"
            options={SELECT_ENTERTAINERS_TYPE}
            placeholder="Entertainer Type"
          />
        </div>
        <div className="form-row">
          <Select
            blankOption="Select State"
            formGroupClassName="col-md-6"
            isValidMessage="looks good"
            label="State"
            name="state"
            options={getStates()}
            placeholder="State"
          />
          <DynamicSelect
            blankOption="Select Local Government"
            dependentOn="state"
            formGroupClassName="col-md-6"
            isValidMessage="looks good"
            label="LGA"
            name="lga"
            options={getLgas}
            placeholder="Local Goverment"
          />
        </div>
        <div className="form-row">
          <Select
            blankOption="Select Year"
            formGroupClassName="col-md-6"
            label="Year you started"
            name="entertainer.started_year"
            options={range(currentYear, currentYear - 20, -1).map(year => ({
              label: year
            }))}
          />
          <Select
            blankOption="Select Option"
            formGroupClassName="col-md-6"
            label="Willing to Travel"
            name="entertainer.willing_to_travel"
            options={[{ label: 'Yes' }, { label: 'No' }]}
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
      </Form>
    </div>
  </div>
);

export default RegisterAsEntertainer;
