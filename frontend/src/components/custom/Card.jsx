import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Card = ({
  children,
  color,
  header,
  className,
  tiles,
  hover,
  title,
  titleColor
}) => (
  <section
    className={classNames(
      className,
      'card card-custom',
      { [`card-${color}`]: true },
      {
        'card-tiles': tiles
      },
      {
        'card-hover': hover
      }
    )}
  >
    {header && (
      <div className="card-header">
        <h4 className="subtitle--2 pt-3 gray text-center">{header}</h4>
      </div>
    )}
    {children && (
      <div className="card-body">
        {title && <h5 className={`card-title text-${titleColor}`}>{title}</h5>}
        {children}
      </div>
    )}
  </section>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  header: PropTypes.string,
  hover: PropTypes.bool,
  tiles: PropTypes.bool,
  title: PropTypes.string,
  titleColor: PropTypes.string
};

Card.defaultProps = {
  children: null,
  className: '',
  color: 'black',
  header: '',
  hover: false,
  tiles: false,
  title: '',
  titleColor: 'white'
};

export default Card;
