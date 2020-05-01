import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Input from 'components/forms/Input';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { youtubeChannelSchema } from 'components/forms/schema/entertainerSchema';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import { ONBOARDING_STEPS } from 'utils/constants';

export const YoutubeChannelForm = ({ moveToNextStep }) => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(youtubeChannelSchema, {
        ...userState.entertainerProfile,
      })}
      onSubmit={(values, actions) => {
        axios
          .put('/api/v1/users/updateEntertainerProfile', values, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({
                type: 'entertainer-youtube-channel',
                user: { entertainerProfile: data.entertainerProfile },
              });
              setMessage({
                type: 'success',
                message: `Your youtube channel has been successfully updated`,
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
      render={({ isSubmitting, handleSubmit }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title text-blue">
              {ONBOARDING_STEPS.youTube.title}
            </h4>
            <Form>
              <AlertMessage {...message} />
              <Input
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

YoutubeChannelForm.propTypes = {
  moveToNextStep: PropTypes.func,
};

YoutubeChannelForm.defaultProps = {
  moveToNextStep: () => {},
};

export default YoutubeChannelForm;
