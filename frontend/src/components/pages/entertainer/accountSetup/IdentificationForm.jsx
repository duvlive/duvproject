import React from 'react';
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
import { getToken } from 'utils/localStorage';
import DatePicker from 'components/forms/DatePicker';
import { ONBOARDING_STEPS } from 'utils/constants';

const IdentificationForm = () => {
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

export default IdentificationForm;
