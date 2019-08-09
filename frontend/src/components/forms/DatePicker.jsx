import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field } from 'formik';
import classNames from 'classnames';
import { FeedbackMessage } from 'components/forms/form-helper';
import Tooltip from 'components/common/utils/Tooltip';
import ReactDatePicker from 'react-datepicker';

const DatePicker = ({
  name,
  className,
  helpText,
  isValidMessage,
  formGroupClassName,
  formik,
  labelClassName,
  label,
  placeholder,
  showFeedback,
  tooltipText,
  tooltipPosition
}) => (
  <div className={classNames('form-group', formGroupClassName)}>
    <div className="switchSizeClassName">
      <Field name={name}>
        {({ form }) => {
          return (
            <ReactDatePicker
              className={classNames('form-control', className)}
              id={name}
              name={name}
              onChange={date => {
                form.setFieldValue(name, date);
              }}
              placeholderText={placeholder}
              selected={form.values[name]}
            />
          );
        }}
      </Field>
      <label className={labelClassName} htmlFor={name} id={`${name}-label `}>
        {label}{' '}
        <Tooltip name={name} position={tooltipPosition} text={tooltipText} />
      </label>
    </div>
    {showFeedback && (
      <FeedbackMessage
        formik={formik}
        helpText={helpText}
        name={name}
        validMessage={isValidMessage}
      />
    )}
  </div>
);

DatePicker.propTypes = {
  className: PropTypes.string,
  formGroupClassName: PropTypes.string,
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  isValidMessage: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  showFeedback: PropTypes.bool,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string
};

DatePicker.defaultProps = {
  className: null,
  formGroupClassName: null,
  helpText: null,
  isValidMessage: '',
  label: '',
  labelClassName: null,
  placeholder: null,
  showFeedback: true,
  tooltipText: null,
  tooltipPosition: 'right'
};

export default connect(DatePicker);
