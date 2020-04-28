import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as queryString from 'query-string';
import { getTokenFromStore } from 'utils/localStorage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import AlertMessage from 'components/common/utils/AlertMessage';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import Invoice from 'components/common/utils/Invoice';

const ViewPayments = (props) => {
  const [message, setMessage] = React.useState({ msg: null, type: null });
  const [loading, setLoading] = React.useState(true);
  const queryParams = queryString.parse(props.location.search);
  const { reference } = queryParams;
  const [paymentInfo, setPaymentInfo] = React.useState([]);
  const [application, setApplication] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/v1/paystack/verify/${reference}`)
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          axios
            .post(
              `/api/v1/applications/approve/${data.payment.metadata.custom_fields[0].value}`,
              {},
              {
                headers: {
                  'x-access-token': getTokenFromStore(),
                },
              }
            )
            .then(function (response) {
              const { status } = response;
              // handle success
              if (status === 200) {
                setMessage({
                  msg: 'Your payment was successfull',
                  type: 'success',
                });
                setPaymentInfo(data.payment);
                setApplication(response.data.application);
                setLoading(false);
              }
            })
            .catch(function (error) {
              setMessage({ msg: error.response.data.message });
              setLoading(false);
            });
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);

        setMessage({ msg: error.response.data.message });
        // navigate to all events
        setLoading(false);
      });
  }, [reference]);

  return (
    <FrontEndPage title="Payment">
      <div className="main-app">
        <section className="container">
          <section className="col-md-10 offset-md-1">
            <LoadingScreen loading={loading} text="Generating your Receipt">
              {!loading && (
                <>
                  <AlertMessage message={message.msg} type={message.type} />
                  {application && (
                    <Invoice
                      application={application}
                      paymentInfo={paymentInfo}
                    />
                  )}
                </>
              )}
            </LoadingScreen>
          </section>
        </section>
      </div>
    </FrontEndPage>
  );
};

ViewPayments.propTypes = {
  location: PropTypes.object,
};

ViewPayments.defaultProps = {
  location: {
    search: '',
  },
};

export default ViewPayments;
