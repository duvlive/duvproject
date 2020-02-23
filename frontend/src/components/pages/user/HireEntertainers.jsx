import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Card from 'components/custom/Card';
import { Col, Row } from 'reactstrap';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { HIRE_ENTERTAINERS_TYPE } from 'utils/constants';

const HireEntertainers = () => (
  <BackEndPage title="Hire Entertainers">
    <div className="main-app">
      <TopMessage message="Hire Entertainers" />

      <section className="app-content">
        <section className="payments">
          <h4 className="main-app__subtitle text-white text-center mt-5 mb-5">
            SELECT YOUR CHOICE
          </h4>
          <Row>
            <Col sm={{ size: 10, offset: 1 }}>
              <HireEntertainers.Cards />
            </Col>
          </Row>
        </section>
      </section>
    </div>
  </BackEndPage>
);

HireEntertainers.Cards = () => (
  <Row className="row-eq-height">
    {Object.keys(HIRE_ENTERTAINERS_TYPE).map(type => (
      <HireEntertainers.Card
        color={HIRE_ENTERTAINERS_TYPE[type].color}
        description={HIRE_ENTERTAINERS_TYPE[type].description}
        key={type}
        title={HIRE_ENTERTAINERS_TYPE[type].title}
      />
    ))}
  </Row>
);

HireEntertainers.Card = ({ color, description, title }) => (
  <Col sm={{ size: 4, offset: 0 }} xs={{ size: 8, offset: 2 }}>
    <Link to={`/user/events/new/${title.toLowerCase()}`}>
      <Card color={color} hover>
        <div className="selection__text">
          <h4>{title}</h4>
          <div className="selection__text--description">{description}</div>
        </div>
      </Card>
    </Link>
  </Col>
);

HireEntertainers.Card.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
export default HireEntertainers;
