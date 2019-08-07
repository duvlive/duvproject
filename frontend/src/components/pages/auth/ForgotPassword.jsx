import React, { Fragment } from 'react';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import Text from 'components/common/utils/Text';
import Quotes from 'data/quotes';
import { randomItem } from 'utils/helpers';

const ForgotPassword = () => (
  <Fragment>
    <section className="auth">
      <Header showRedLogo />
      <Content />
    </section>
    <Footer className="mt-0" />
  </Fragment>
);

const Content = () => {
  const quote = randomItem(Quotes);
  return (
    <section>
      <div className="container-fluid">
        <Row>
          <Col className="d-none d-sm-block" sm={{ size: 6, offset: 1 }}>
            <Text.VerticalAlign>
              <div className="auth__quotes">
                <h4 className="auth__quotes--text">{quote.text}</h4>
                <p>- {quote.name}</p>
              </div>
            </Text.VerticalAlign>
          </Col>
          <Col sm={{ size: 5 }}>
            <div className="auth__container">
              <section>
                <form>
                  <h5 className="header font-weight-normal mb-4">
                    Forgot Password
                  </h5>
                  <div className="form-group">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Enter your email address"
                      type="email"
                    />
                  </div>
                  <button className="btn btn-danger btn-wide btn-transparent">
                    Reset Password
                  </button>
                </form>
              </section>
              <section className="auth__footer">
                <div className="mt-4 text-center">
                  <Link className="auth__link" to="/login">
                    Back to Login Page
                  </Link>
                </div>
              </section>
            </div>
          </Col>
        </Row>

        <p />
      </div>
    </section>
  );
};
export default ForgotPassword;
