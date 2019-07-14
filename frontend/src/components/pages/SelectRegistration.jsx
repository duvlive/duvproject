import React from 'react';
import Card from 'components/custom/Card';
import { Col, Row } from 'reactstrap';
import { Link } from '@reach/router';

const SelectRegistration = () => (
  <section className="spacer--4">
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <h2 className="subtitle--2 text-center font-weight-bold mt-5 mb-5">
            SELECT YOUR CHOICE
          </h2>
          <Row>
            <Col sm={{ size: 6 }}>
              <Link to="/register/user">
                <Card color="blue">
                  <div className="selection__text">
                    Register as a <span>User</span>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col sm={{ size: 6 }}>
              <Link to="/register/user">
                <Card color="green">
                  <div className="selection__text">
                    Register as an <span>Entertainer</span>
                  </div>
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </section>
);

export default SelectRegistration;
