import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { identificationSchema } from 'components/forms/schema/entertainerSchema';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import { ONBOARDING_STEPS } from 'utils/constants';

const IdentificationForm = ({ moveToNextStep }) => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(identificationSchema, {
        ...userState.identification,
      })}
      onSubmit={(values, actions) => {
        axios
          .put('/api/v1/identification', values, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;

            if (status === 200) {
              userDispatch({
                type: 'entertainer-identification',
                identification: data.identification,
              });
              setMessage({
                type: 'success',
                message: `Your identification has been successfully updated`,
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
                    { label: 'National ID Card' },
                  ]}
                />
                <Input
                  formGroupClassName="col-md-6"
                  label="ID Number"
                  name="idNumber"
                  placeholder="ID Number"
                />
              </div>
              <div className="form-row">
                <Input
                  formGroupClassName="col-md-6"
                  label="Issue Date"
                  name="issueDate"
                  placeholder="Issue Date"
                />
                <Input
                  formGroupClassName="col-md-6"
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

IdentificationForm.propTypes = {
  moveToNextStep: PropTypes.func,
};

IdentificationForm.defaultProps = {
  moveToNextStep: () => {},
};

export default IdentificationForm;
