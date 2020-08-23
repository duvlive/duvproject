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
  labelLink,
}) => {
  const sanitizedLabelLink = { to: null, text: null, ...labelLink };
  return (
    <label className={className} htmlFor={name}>
      {text}{' '}
      {optional ? (
        <em className="optional">(optional)</em>
      ) : (
        <small className="text-white">*</small>
      )}
      <Tooltip name={name} position={tooltipPosition} text={tooltipText} />
      {/* Label Link is a Link */}
      {sanitizedLabelLink.to && sanitizedLabelLink.text && (
        <Link className="float-right text-red" to={sanitizedLabelLink.to}>
          {sanitizedLabelLink.text}
        </Link>
      )}
      {/* Label Link calls a function */}
      {!sanitizedLabelLink.to && sanitizedLabelLink.text && (
        <div
          className="float-right text-muted cursor-pointer"
          onClick={sanitizedLabelLink.onClick}
        >
          {sanitizedLabelLink.text}
        </div>
      )}
    </label>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  labelLink: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
  name: PropTypes.string,
  optional: PropTypes.bool,
  text: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
};
Label.defaultProps = {
  className: null,
  labelLink: {
    to: '',
    text: '',
    onClick: () => {},
  },
  name: null,
  optional: false,
  text: null,
  tooltipText: null,
  tooltipPosition: 'right',
};

export default Label;
