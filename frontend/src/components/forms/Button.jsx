import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, onClick, loading, className, children }) => (
  <button className={`btn ${className}`} onClick={onClick} type={type}>
    {loading && (
      <span
        aria-hidden="true"
        className="spinner-border spinner-border-sm mr-2"
        role="status"
      />
    )}
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};

Button.defaultProps = {
  type: 'submit',
  loading: false,
  className: ''
};

export default Button;
