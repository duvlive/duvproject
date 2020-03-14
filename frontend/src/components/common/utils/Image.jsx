import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Image = ({
  src,
  name,
  className,
  bordered,
  responsiveImage,
  rounded
}) => (
  <img
    alt={name}
    className={classNames(
      className,
      {
        'img-fluid': responsiveImage
      },
      {
        'img-thumbnail': bordered
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
  responsiveImage: PropTypes.bool,
  rounded: PropTypes.bool,
  src: PropTypes.string.isRequired
};

Image.defaultProps = {
  bordered: false,
  className: '',
  responsiveImage: true,
  rounded: true
};

Image.Big = ({ src, name, className }) => (
  <img
    alt={name}
    className={classNames(className, 'img-fluid', 'img-big')}
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
