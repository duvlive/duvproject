import React from 'react';
import axios from 'axios';
import BackEndPage from 'components/common/layout/BackEndPage';
import TopMessage from 'components/common/layout/TopMessage';
import AddEntertainerDetails from 'components/common/entertainers/AddEntertainerDetails';
import { getTokenFromStore } from 'utils/localStorage';

const AddEntertainerToEvent = () => {
  React.useEffect(() => {
    axios
      .get('/api/v1/events', {
        headers: {
          'x-access-token': getTokenFromStore()
        }
      })
      .then(function(response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          // setMessage({
          //   type: 'success',
          //   message: data.message
          // });
        }
      })
      .catch(function(error) {
        // setMessage({
        //   message: error.response.data.message
        // });
      });
  }, []);
  return (
    <BackEndPage title="New Events">
      <div className="main-app">
        <TopMessage message="Add Entertainer" />

        <section className="app-content">
          <AddEntertainerDetails />
        </section>
      </div>
    </BackEndPage>
  );
};
export default AddEntertainerToEvent;
