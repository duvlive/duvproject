import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const Testimonials = ({ name, testimonial }) => {
  return (
    <section className="testimonials spacer">
      <div className="container-fluid">
        <Row>
          <Col sm={{ size: 8, offset: 2 }} xs={{ size: 10, offset: 1 }}>
            <h2 className="testimonials__header">Testimonials</h2>
            <p className="testimonials__text">{testimonial}</p>
            <div className="testimonials__name text-uppercase">{name}</div>
          </Col>
        </Row>
        <div className="spacer-3" />
      </div>
    </section>
  );
};

Testimonials.propTypes = {
  name: PropTypes.string.isRequired,
  testimonial: PropTypes.string.isRequired
};

export default Testimonials;
