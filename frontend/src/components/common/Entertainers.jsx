import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { CardTitle, Col, Card, CardImg, CardImgOverlay } from 'reactstrap';

const Entertainers = ({ stage_name, image, type, slug }) => (
  <Col sm={4}>
    <Link to={`entertainer/${slug}`}>
      <Card className="entertainer-card">
        <CardImg alt={stage_name} className="img-fluid" src={image} top />
        <CardImgOverlay>
          <CardTitle>{stage_name}</CardTitle>
          <div className="entertainer_type">{type}</div>
        </CardImgOverlay>
      </Card>
    </Link>
  </Col>
);

Entertainers.propTypes = {
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  stage_name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

Entertainers.List = ({ lists }) =>
  lists.map(({ stage_name, img, type, slug }, index) => (
    <Entertainers
      image={img.full}
      key={slug}
      slug={slug}
      stage_name={stage_name}
      type={type}
    />
  ));

export default Entertainers;
