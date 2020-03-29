import React from 'react';
import axios from 'axios';
import * as queryString from 'query-string';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';

const ViewPayments = props => {
  let loading = false;
  const queryParams = queryString.parse(props.location.search);
  const { reference } = queryParams;
  const [paymentInfo, setPaymentInfo] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`/api/v1/paystack/verify/${reference}`)
      .then(function(response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setPaymentInfo(data.payment);
        }
      })
      .catch(function(error) {
        console.log(error.response.data.message);
        // navigate to all events
      });
  }, [reference]);

  console.log('payments', paymentInfo);
  console.log('reference', reference);

  if (!paymentInfo) {
    loading = true;
  }
  return (
    <BackEndPage loading={loading} title="Payments History">
      <div className="main-app">
        <TopMessage message="Payments History" />

        <section className="app-content">
          <section className="payments">
            <h1>Payments</h1>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

export default ViewPayments;
