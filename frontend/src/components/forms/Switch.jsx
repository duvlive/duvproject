import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field } from 'formik';
import classNames from 'classnames';
import { FeedbackMessage, feedback } from 'components/forms/form-helper';
import Tooltip from 'components/common/utils/Tooltip';
import Switcher from 'rc-switch';
import 'rc-switch/assets/index.css';

const Switch = ({
  name,
  className,
  value,
  helpText,
  isValidMessage,
  formGroupClassName,
  formik,
  labelClassName,
  label,
  showFeedback,
  tooltipText,
  tooltipPosition
}) => (
  <div className={classNames('form-group', formGroupClassName)}>
    <div className="switchSizeClassName">
      <Field name={name}>
        {({ field, form }) => {
          return (
            <Switcher
              checked={field.value || value}
              className={className}
              id={name}
              name={name}
              onChange={() => {
                form.setFieldValue(name, !field.value);
              }}
            />
          );
        }}
      </Field>
      <label className={labelClassName} htmlFor={name} id={`${name}-label `}>
        {label}{' '}
        <Tooltip name={name} position={tooltipPosition} text={tooltipText} />
      </label>
    </div>
    <FeedbackMessage
      formik={formik}
      helpText={helpText}
      name={name}
      showFeedback={showFeedback}
      validMessage={isValidMessage}
    />
  </div>
);

Switch.propTypes = {
  className: PropTypes.string,
  formGroupClassName: PropTypes.string,
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  isValidMessage: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
  value: PropTypes.bool
};

Switch.defaultProps = {
  className: null,
  formGroupClassName: null,
  helpText: null,
  isValidMessage: '',
  label: null,
  labelClassName: 'pl-2',
  showFeedback: feedback.ALL,
  tooltipText: null,
  tooltipPosition: 'right',
  value: false
};

export default connect(Switch);
