import React from 'react';
import PropTypes from 'prop-types';
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
import { entertainerDetailsSchema } from 'components/forms/schema/entertainerSchema';
import UploadImage from 'components/common/utils/UploadImage';
import { BUDGET, ONBOARDING_STEPS } from 'utils/constants';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import DynamicSelect from 'components/forms/DynamicSelect';
import { getStates, getLgas } from 'data/naija-states-and-lgas';

const currentYear = new Date().getFullYear();

const EntertainerDetailsForm = ({ moveToNextStep }) => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(entertainerDetailsSchema, {
        ...userState.entertainerProfile,
        availableFor: JSON.parse(userState.entertainerProfile.availableFor),
      })}
      onSubmit={(values, actions) => {
        const availableFor = JSON.stringify(values.availableFor);
        const preferredCharges =
          values.preferredCharges || BUDGET[BUDGET.length - 1].value;
        const payload = { ...values, availableFor, preferredCharges };
        console.log('payload', payload);
        axios
          .put('/api/v1/users/updateEntertainerProfile', payload, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({
                type: 'entertainer-profile-update',
                user: data,
              });
              setMessage({
                type: 'success',
                message: `Your profile has been successfully updated`,
              });
              actions.setSubmitting(false);
              moveToNextStep();
            }
          })
          .catch(function (error) {
            setMessage({ message: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title text-blue">
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
                  label="Location"
                  name="location"
                  options={getStates()}
                  placeholder="Location (in Nigeria)"
                />
                <DynamicSelect
                  blankOption="Select LGA / City"
                  dependentOn="location"
                  formGroupClassName="col-md-6"
                  label="LGA / City"
                  name="city"
                  options={getLgas}
                  placeholder="LGA / City"
                />
              </div>
              <div className="form-row">
                <Select
                  blankOption="Choose your base charges"
                  formGroupClassName="col-md-6"
                  label="Minimum Charges (in Naira)"
                  name="baseCharges"
                  options={BUDGET}
                  placeholder="Base Charges"
                />
                <Select
                  blankOption="Choose your highest charges"
                  formGroupClassName="col-md-6"
                  label="Preferred Charge (in Naira)"
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
                      value: true,
                    },
                    {
                      label: 'No, I prefer events in my location only',
                      value: false,
                    },
                  ]}
                />
                <Select
                  blankOption="Year Started"
                  formGroupClassName="col-md-6"
                  label="Year you started"
                  name="yearStarted"
                  options={range(currentYear, currentYear - 20, -1).map(
                    (year) => ({
                      label: year,
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
                  { id: 6, name: 'Aniversary' },
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

EntertainerDetailsForm.propTypes = {
  moveToNextStep: PropTypes.func,
};

EntertainerDetailsForm.defaultProps = {
  moveToNextStep: () => {},
};

export default EntertainerDetailsForm;
