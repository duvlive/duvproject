import React from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Input from 'components/forms/Input';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { youtubeChannelSchema } from 'components/forms/schema/entertainerSchema';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';
import { getToken } from 'utils/localStorage';
import { ONBOARDING_STEPS } from 'utils/constants';

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
            setMessage(error.response.data.message);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title text-blue">
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

export default YoutubeChannelForm;
