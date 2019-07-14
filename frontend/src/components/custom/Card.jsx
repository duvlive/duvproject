import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Card = ({ hollow, children, color, header }) => (
  <section
    className={classNames(
      'card card-custom',
      { [`card-${color}`]: true },
      {
        'card-hollow': hollow
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
  color: PropTypes.string.isRequired,
  header: PropTypes.string,
  hollow: PropTypes.bool
};

Card.defaultProps = {
  children: null,
  header: '',
  hollow: false
};

export default Card;
