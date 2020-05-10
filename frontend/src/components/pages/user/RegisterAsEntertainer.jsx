import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import Button from 'components/forms/Button';
import axios from 'axios';
import { getTokenFromStore, storeUserType } from 'utils/localStorage';
import { navigate } from '@reach/router';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';
import { USER_TYPES } from 'utils/constants';
import DuvLiveModal from 'components/custom/Modal';
import ListeningMusic from 'assets/img/background/register-as-entertainer.svg';

const RegisterAsEntertainer = () => {
  const [message, setMessage] = React.useState(null);

  const { userDispatch } = React.useContext(UserContext);

  const becomeAnEntertainer = () => {
    axios
      .get(`/api/v1/become-an-entertainer`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status } = response;
        if (status === 200) {
          userDispatch({ type: 'upgrade-to-an-entertainer' });
          storeUserType(USER_TYPES.entertainer);
          navigate('/entertainer/dashboard');
        }
      })
      .catch(function (error) {
        setMessage({ message: error.response.data.message });
        // navigate to all events
      });
  };

  return (
    <BackEndPage title="Register as an Entertainer">
      <div className="main-app">
        <TopMessage message="Are you a performing DJ, MC or Liveband?" />
        <section className="app-content">
          <AlertMessage {...message} />
          <div className="row register-as-entertainer">
            <div className="col-md-6 py-2">
              <p className="lead text-muted-light">
                You can also sign up for an Entertainer Account to sell your
                entertainment services directly to customers willing to hire
                you.
              </p>

              <p className="lead text-muted-light">Let us begin by clicking</p>

              <DuvLiveModal
                actionFn={becomeAnEntertainer}
                actionText="Yes, Upgrade Account"
                body={
                  <p>
                    In compliance with mandatory KYC requirements by regulators
                    for fraud prevention, additional details will be needed to
                    make your entertainer registration complete. Do you want to
                    proceed?
                  </p>
                }
                closeModalText="Cancel"
                title="Upgrade Account"
              >
                <Button className="btn-danger btn-lg btn-wide btn-transparent mt-5">
                  Register as an Entertainer
                </Button>
                <div className="small--2 text-muted mt-3">
                  By clicking the above button you acknowledge that you have
                  carefully read and understood DUV LIVE Terms of Use and
                  Privacy Policy.
                </div>
              </DuvLiveModal>
            </div>
            <div className="col-md-5 offset-md-1">
              <img alt="Listening to Music" src={ListeningMusic} />
            </div>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

export default RegisterAsEntertainer;
