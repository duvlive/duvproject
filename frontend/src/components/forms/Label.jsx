import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'components/common/utils/Tooltip';
import { Link } from '@reach/router';

const Label = ({
  className,
  name,
  optional,
  text,
  tooltipPosition,
  tooltipText,
  labelLink
}) => (
  <label className={className} htmlFor={name}>
    {text} {optional && <em className="optional">(optional)</em>}
    <Tooltip name={name} position={tooltipPosition} text={tooltipText} />
    {labelLink && (
      <Link className="float-right" to={labelLink.to}>
        {labelLink.text}
      </Link>
    )}
  </label>
);

Label.propTypes = {
  className: PropTypes.string,
  labelLink: PropTypes.shape({
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  name: PropTypes.string,
  optional: PropTypes.bool,
  text: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string
};
Label.defaultProps = {
  className: null,
  labelLink: null,
  name: null,
  optional: false,
  text: null,
  tooltipText: null,
  tooltipPosition: 'right'
};

export default Label;
