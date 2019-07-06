import React from 'react';
import { CardTitle, Col, Card, CardImg, CardImgOverlay } from 'reactstrap';

const Entertainers = ({ name, image, type }) => (
  <Col sm={4}>
    <Card className="entertainer-card">
      <CardImg alt={name} className="img-fluid" src={image} top />
      <CardImgOverlay>
        <CardTitle>{name}</CardTitle>
        <div className="entertainer_type">{type}</div>
      </CardImgOverlay>
    </Card>
  </Col>
);

Entertainers.List = ({ lists }) =>
  lists.map(({ name, img, type }) => (
    <Entertainers image={img.full} key={name} name={name} type={type} />
  ));

export default Entertainers;
