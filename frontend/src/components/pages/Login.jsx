import React, { Fragment } from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import Text from 'components/common/Text';

const Login = () => (
  <Fragment>
    <section className="auth">
      <Header />
      <Content />
    </section>
    <Footer className="mt-0" />
  </Fragment>
);

const Content = () => (
  <section>
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 6, offset: 1 }}>
          <Text.VerticalAlign>
            <div className="auth__quotes">
              <h4 className="auth__quotes--text">
                Some of the most morally conscious, kindest, most compassionate
                people are in the entertainment industry, people who want to
                affect the world and make it a better place through telling
                human, heartfelt stories.
              </h4>
              <p>- Rainn Wilson</p>
            </div>
          </Text.VerticalAlign>
        </Col>
        <Col sm={{ size: 5 }}>
          <div className="auth__container">
            <section>
              <form>
                <h5 className="header font-weight-normal mb-4">Login</h5>
                <div>
                  <div className="form-group">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Enter your email address"
                      type="email"
                    />
                  </div>
                  <div className="form-group">
                    <label className="d-block" htmlFor="inputPassword4">
                      Password
                      <Link className="float-right" to="forgot-password">
                        Forgot Password?
                      </Link>
                    </label>
                    <input
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Enter your password"
                      type="password"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-wide btn-transparent"
                  href="/"
                >
                  Sign in
                </button>
              </form>
            </section>
            <section className="auth__social-media">
              <p className="auth__social-media--text">or login with:</p>
              <Link className="auth__social-media--icons" to="/">
                <span className="icon-google" />
              </Link>
              <Link className="auth__social-media--icons" to="/">
                <span className="icon-facebook-official" />
              </Link>
            </section>
            <section className="auth__footer">
              <div className="register mt-4 text-center">
                Not Registered?{' '}
                <Link className="auth__link" to="/register">
                  {' '}
                  Create Account
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
export default Login;
