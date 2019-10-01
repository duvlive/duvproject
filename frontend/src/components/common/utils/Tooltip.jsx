import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

const Tooltip = ({ name, text, selector, position }) => {
  return (
    <>
      {text && (
        <>
          <span id={`${name}-tooltip`}>{selector}</span>
          <UncontrolledTooltip placement={position} target={`${name}-tooltip`}>
            {text}
          </UncontrolledTooltip>
        </>
      )}
    </>
  );
};

export default Tooltip;

Tooltip.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
  selector: PropTypes.node,
  text: PropTypes.string
};

Tooltip.defaultProps = {
  text: null,
  selector: <i className="icon-help" />
};
