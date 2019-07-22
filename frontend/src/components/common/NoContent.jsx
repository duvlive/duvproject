import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from '@reach/router';

const NoContent = ({ text, linkText, linkTo, isButton }) => (
  <section className="no-content text-center pb-4">
    <h4 className="text-muted subtitle--3 pt-3 pb-3">{text}</h4>
    {linkText && linkTo && (
      <Link
        className={classNames(
          { 'text-muted pb-3 d-block': !isButton },
          { 'btn btn-danger btn-wide btn-transparent': isButton }
        )}
        to={linkTo}
      >
        {linkText}
      </Link>
    )}
  </section>
);

NoContent.propTypes = {
  isButton: PropTypes.bool,
  linkText: PropTypes.string,
  linkTo: PropTypes.string,
  text: PropTypes.string.isRequired
};

NoContent.defaultProps = {
  isButton: false,
  linkText: '',
  linkTo: '/'
};

export default NoContent;
