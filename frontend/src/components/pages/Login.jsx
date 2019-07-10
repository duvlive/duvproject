import React, { Fragment } from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';

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
          <div className="auth__quotes">
            <h4 className="font-weight-normal m-l">
              Some of the most morally conscious, kindest, most compassionate
              people are in the entertainment industry, people who want to
              affect the world and make it a better place through telling human,
              heartfelt stories.
            </h4>
            <p>- Rainn Wilson</p>
          </div>
        </Col>
        <Col sm={{ size: 5 }}>
          <div className="auth__container">
            <form>
              <h4 className="header font-weight-normal mb-4">Login</h4>
              <div>
                <div className="form-group">
                  <label for="inputEmail4">Email</label>
                  <input
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Enter your email address"
                    type="email"
                  />
                </div>
                <div className="form-group">
                  <label for="inputPassword4">Password</label>
                  <input
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Enter your password"
                    type="password"
                  />
                </div>
              </div>
              <button
                className="btn btn-light btn-lg hvr-sweep-to-right"
                href="/"
              >
                Sign in
              </button>
            </form>
          </div>
          <div className="register mt-4 text-center">
            Don't have an account.{' '}
            <Link className="register" to="/register">
              Register Now
            </Link>
          </div>
        </Col>
      </Row>

      <p />
    </div>
  </section>
);
export default Login;
