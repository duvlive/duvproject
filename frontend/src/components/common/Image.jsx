import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Image = ({ src, name, className, bordered, rounded }) => (
  <img
    alt={name}
    className={classNames(
      className,
      'img-responsive',
      {
        'img-thumbnails': bordered
      },
      {
        'rounded-circle': rounded
      }
    )}
    src={src}
    title={name}
  />
);

Image.propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
  src: PropTypes.string.isRequired
};

Image.defaultProps = {
  bordered: false,
  className: '',
  rounded: true
};

Image.Big = ({ src, name, className }) => (
  <img
    alt={name}
    className={classNames(className, 'img-responsive', 'img-big')}
    src={src}
    title={name}
  />
);

Image.Big.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

Image.Big.defaultProps = {
  className: ''
};

export default Image;
