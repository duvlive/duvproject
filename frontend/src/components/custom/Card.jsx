import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const Card = () => {
  return <div>This is a card</div>;
};

export default Card;

Card.Hollow = ({ color, description, name, link }) => (
  <Link className={`card card-custom card-hollow card-${color}`} to={link}>
    <div className="card-header">
      <h4 className="card-subtitle--1 gray text-center">{name}</h4>
    </div>
    <div className="card-body">{description}</div>
  </Link>
);

Card.Hollow.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
