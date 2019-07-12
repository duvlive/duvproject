import React from 'react';
import Card from 'components/custom/Card';
import { Col, Row } from 'reactstrap';

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
              <Card.Hollow
                color="green"
                description="Users can ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
                link="/register/user"
                name="User"
              />
            </Col>
            <Col sm={{ size: 6 }}>
              <Card.Hollow
                color="yellow"
                description="Entertainer will enjoy volutpat mattis eros. Nullam malesuada erat ut turpis. Ipsum dolor sit amet, consectetuer adipiscing elit."
                link="/register/entertainer"
                name="Entertainer"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </section>
);

export default SelectRegistration;
