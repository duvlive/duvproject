import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Card = ({ children, color, header, className, tiles }) => (
  <section
    className={classNames(
      'card card-custom',
      { [`card-${color}`]: true },
      {
        'card-tiles': tiles
      }
    )}
  >
    {header && (
      <div className="card-header">
        <h4 className="subtitle--2 pt-3 gray text-center">{header}</h4>
      </div>
    )}
    {children && <div className="card-body">{children}</div>}
  </section>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  header: PropTypes.string,
  tiles: PropTypes.bool
};

Card.defaultProps = {
  children: null,
  className: '',
  header: '',
  tiles: false
};

export default Card;
