import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import SelectRegistration from 'components/pages/SelectRegistration';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';

const text = {
  entertainer: {
    subtitle: 'MC, DJ OR OWN A LIVE BAND?',
    buttonText: 'Register as an Entertainer'
  },
  user: {
    subtitle: 'NO GO SPOIL YOUR PARTY O!!!',
    buttonText: 'Register as a User'
  }
};
const allowedTypes = ['entertainer', 'user'];
const showRegistrationPage = type => {
  return allowedTypes.includes(type);
};

const Register = ({ type }) => (
  <Fragment>
    <section className="auth">
      <Header showRedLogo />
      {showRegistrationPage(type) ? (
        <Content type={type} />
      ) : (
        <SelectRegistration />
      )}
    </section>
    <Footer className="mt-0" />
  </Fragment>
);

Register.propTypes = {
  type: PropTypes.oneOf(allowedTypes)
};
Register.defaultProps = {
  type: null
};

const Content = ({ type }) => (
  <section>
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <div className="auth__container auth__container--lg">
            <section>
              <form>
                <h5 className="header font-weight-normal text-uppercase mb-1">
                  REGISTER AS AN {type}
                </h5>
                <div className="text-red-100 mb-5">{text[type].subtitle}</div>

                <section className="auth__social-media text-center">
                  <p className="auth__social-media--text">Register with:</p>
                  <Link className="auth__social-media--icons" to="/">
                    <span className="icon-google" />
                  </Link>
                  <Link className="auth__social-media--icons" to="/">
                    <span className="icon-facebook-official" />
                  </Link>
                  <p className="auth__social-media--text mt-0 mb-5">OR</p>
                </section>

                <section className="auth__form">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        className="form-control"
                        id="first_name"
                        placeholder="First Name"
                        type="text"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        className="form-control"
                        id="last_name"
                        placeholder="Last Name"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Email</label>
                      <input
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        type="email"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Phone</label>
                      <input
                        className="form-control"
                        id="phone"
                        placeholder="Phone"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="passowrd">Password</label>
                      <input
                        className="form-control"
                        id="passowrd"
                        placeholder="Password"
                        type="password"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="confirm_password">Confirm Password</label>
                      <input
                        className="form-control"
                        id="confirm_password"
                        placeholder="Subject"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="exampleCheck1"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      By checking here and continuing, I agree to the{' '}
                      <Link to="/privacy-policy">DUV LIVE Terms of Use</Link>
                    </label>
                  </div>

                  <button className="btn btn-danger btn-wide btn-transparent mt-4">
                    {text[type].buttonText}
                  </button>
                </section>
              </form>
            </section>
            <section className="auth__footer">
              <div className="register mt-4 text-center">
                Already have an account with us?
                <Link className="auth__link" to="/login">
                  {' '}
                  SIGN IN
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

Content.propTypes = {
  type: PropTypes.oneOf(allowedTypes)
};
Content.defaultProps = {
  type: null
};

export default Register;
