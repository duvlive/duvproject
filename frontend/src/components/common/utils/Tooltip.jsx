import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

const Tooltip = ({ name, message, selector, position }) => {
  return (
    <>
      {message && (
        <>
          <span id={name}>{selector}</span>
          <UncontrolledTooltip placement={position} target={name}>
            {message}
          </UncontrolledTooltip>
        </>
      )}
    </>
  );
};

export default Tooltip;

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
  selector: PropTypes.node
};

Tooltip.defaultProps = {
  selector: <i className="icon-help" />
};
