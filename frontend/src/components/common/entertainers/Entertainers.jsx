import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { CardTitle, Col, Card, CardImg, CardImgOverlay } from 'reactstrap';

const Entertainers = ({ stageName, image, type, slug }) => (
  <Col sm={4}>
    <Link to={`/entertainers/profile/${slug}`}>
      <Card className="entertainer-card">
        <CardImg
          alt={stageName}
          className="img-fluid"
          src={image}
          title={stageName}
          top
        />
        <CardImgOverlay>
          <CardTitle>{stageName}</CardTitle>
          <div className="entertainer_type">{type}</div>
        </CardImgOverlay>
      </Card>
    </Link>
  </Col>
);

Entertainers.propTypes = {
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  stageName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Entertainers.List = ({ lists }) =>
  lists.map(({ stageName, profileImg, entertainerType, slug }, index) => (
    <Entertainers
      image={profileImg}
      key={slug}
      slug={slug}
      stageName={stageName}
      type={entertainerType}
    />
  ));

export default Entertainers;
