import React from 'react';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import axios from 'axios';
import Button from 'components/forms/Button';
import AlertMessage from 'components/common/utils/AlertMessage';
import { feedback } from 'components/forms/form-helper';

const SearchEntertainerFields = () => {
  const [message, setMessage] = React.useState(null);
  return (
    <div className="card card-custom card-black card-form col-sm-3">
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={(values, actions) => {
          // post to api
          axios
            .post('/api/v1/users/login', values)
            .then(function(response) {
              const { status, data } = response;
              if (status === 200) {
              }
            })
            .catch(function(error) {
              setMessage({
                message: error.response.data.message
              });
            });
          actions.setSubmitting(false);
        }}
        render={({ isSubmitting, handleSubmit }) => (
          <Form>
            <AlertMessage {...message} />
            <Input
              label="Stage Name"
              name="stage_name"
              placeholder="Stage Name"
              showFeedback={feedback.NONE}
            />
            <Button loading={isSubmitting} onClick={handleSubmit}>
              Search
            </Button>
          </Form>
        )}
      />
    </div>
  );
};
export default SearchEntertainerFields;
