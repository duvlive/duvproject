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
        <TopMessage message="Register as an Entertainer" />
        <section className="app-content">
          <AlertMessage {...message} />
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia,
            temporibus quisquam tenetur magnam, cupiditate vitae odio ex
            inventore optio, eligendi minus. Temporibus enim incidunt quos
            voluptatem, inventore ipsam atque iusto?
          </p>
          <DuvLiveModal
            actionFn={becomeAnEntertainer}
            actionText="Yes, Upgrade Account"
            body={
              <p>
                Are you sure you want to upgrade your account to an Entertainers
                Account. This process is irreversible but you can always switch
                back to this account by clicking on `Switch to User Account` on
                the side menu.
              </p>
            }
            closeModalText="Cancel"
            title="Upgrade Account"
          >
            <Button className="btn-danger btn-lg btn-wide btn-transparent">
              Register as an Entertainer
            </Button>
          </DuvLiveModal>
        </section>
      </div>
    </BackEndPage>
  );
};

export default RegisterAsEntertainer;
