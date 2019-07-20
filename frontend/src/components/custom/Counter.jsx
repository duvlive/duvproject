import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const Counter = ({ number }) => {
  const [scrollStatus, setscrollStatus] = useState(true);
  const [start, setstart] = useState(0);
  const onVisibilityChange = isVisible => {
    if (isVisible && scrollStatus) {
      setstart(1);
      setscrollStatus(false);
    }
  };

  return (
    <VisibilitySensor
      delayedCall
      offset={{ top: 10 }}
      onChange={onVisibilityChange}
    >
      <CountUp end={number} start={start}>
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    </VisibilitySensor>
  );
};

Counter.propTypes = {
  number: PropTypes.number.isRequired
};

export default Counter;
