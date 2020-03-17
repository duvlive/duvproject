import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from '@reach/router';

const NoContent = ({ text, linkText, linkTo, isButton, className }) => (
  <section className={classNames(className, 'no-content text-center')}>
    <h4 className="text-muted-light subtitle--3 pt-3">{text}</h4>
    {linkText && linkTo && (
      <Link
        className={classNames(
          { 'text-muted d-block': !isButton },
          {
            'btn btn-danger d-inline-block mt-3 btn-wide btn-transparent': isButton
          }
        )}
        to={linkTo}
      >
        {linkText}
      </Link>
    )}
  </section>
);

NoContent.propTypes = {
  className: PropTypes.string,
  isButton: PropTypes.bool,
  linkText: PropTypes.string,
  linkTo: PropTypes.string,
  text: PropTypes.any.isRequired
};

NoContent.defaultProps = {
  className: 'mt-5 mb-5',
  isButton: false,
  linkText: '',
  linkTo: '/'
};

export default NoContent;
