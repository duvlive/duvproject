import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from 'components/common/layout/Header';
import { Row, Col } from 'reactstrap';
import Footer from 'components/common/layout/Footer';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { navigate } from '@reach/router';
import AlertMessage from 'components/common/utils/AlertMessage';

const ProcessExistingUserAsBandMember = ({ bandToken }) => {
  const [message, setMessage] = React.useState({ message: 'Tesing' });

  React.useEffect(() => {
    bandToken &&
      axios
        .get('/api/v1/users/existing/bandMember', { params: { bandToken } })
        .then(function (response) {
          const { status } = response;
          if (status === 200) {
            navigate(`/login/${bandToken}`);
          }
        })
        .catch(function (error) {
          console.log('error', error);
          setMessage({
            message: error.response.data.message,
            lists:
              error.response.data.errors &&
              Object.values(error.response.data.errors),
          });
        });
  }, [bandToken]);

  return (
    <>
      <section className="auth">
        <Header showRedLogo />
        <section>
          <div className="container-fluid">
            <Row>
              <Col sm={{ size: 8, offset: 2 }}>
                <div className="auth__container auth__container--lg">
                  {!message && <LoadingScreen />}
                  <h3 className="font-weight-normal mb-4">
                    Adding you to your Band Member
                  </h3>
                  <AlertMessage {...message} />
                </div>
              </Col>
            </Row>
            <p />
          </div>
        </section>
      </section>
      <Footer className="mt-0" />
    </>
  );
};

ProcessExistingUserAsBandMember.propTypes = {
  bandToken: PropTypes.string,
};

ProcessExistingUserAsBandMember.defaultProps = {
  bandToken: null,
};

export default ProcessExistingUserAsBandMember;
