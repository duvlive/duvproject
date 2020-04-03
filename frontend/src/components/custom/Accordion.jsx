import React from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ children, active, title }) => {
  const [showAccordion, setShowAccordion] = React.useState(active);
  const currentState = showAccordion ? 'show' : '';
  return (
    <div className="accordion__container">
      <h4
        className={`accordion__title ${currentState}`}
        onClick={() => {
          setShowAccordion(!showAccordion);
          console.log(showAccordion);
        }}
      >
        {title}{' '}
        <span className="accordion__icon">{showAccordion ? '-' : '+'}</span>
      </h4>
      <div className={`accordion__collapse ${currentState}`}>
        <div className="accordion__content">{children}</div>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

Accordion.defaultProps = {
  active: false
};
export default Accordion;
