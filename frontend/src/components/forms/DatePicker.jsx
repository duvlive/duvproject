import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field } from 'formik';
import classNames from 'classnames';
import {
  getValidityClass,
  FeedbackMessage,
  feedback
} from 'components/forms/form-helper';
import Tooltip from 'components/common/utils/Tooltip';
import ReactDatePicker from 'react-datepicker';

let selectedDateTime;

const DatePicker = ({
  name,
  className,
  dateFormat,
  helpText,
  isValidMessage,
  formGroupClassName,
  formik,
  labelClassName,
  label,
  placeholder,
  showFeedback,
  showTimeSelect,
  showTimeSelectOnly,
  timeCaption,
  timeIntervals,
  tooltipText,
  tooltipPosition
}) => (
  <div className={classNames('form-group', formGroupClassName)}>
    <div>
      <Field name={name}>
        {({ form }) => {
          return (
            <ReactDatePicker
              autoComplete="off"
              className={classNames(
                'form-control',
                className,
                getValidityClass(formik, name, showFeedback)
              )}
              dateFormat={dateFormat}
              id={name}
              name={name}
              onChange={date => {
                selectedDateTime = date;
                const dateTime = showTimeSelectOnly
                  ? date.toLocaleTimeString()
                  : date.toLocaleString();
                form.setFieldValue(name, dateTime);
              }}
              placeholderText={placeholder}
              selected={selectedDateTime}
              showTimeSelect={showTimeSelect}
              showTimeSelectOnly={showTimeSelectOnly}
              timeCaption={timeCaption}
              timeIntervals={timeIntervals}
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

DatePicker.propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  formGroupClassName: PropTypes.string,
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  isValidMessage: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  showTimeSelect: PropTypes.bool,
  showTimeSelectOnly: PropTypes.bool,
  timeCaption: PropTypes.string,
  timeIntervals: PropTypes.number,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string
};

DatePicker.defaultProps = {
  className: null,
  dateFormat: 'MMMM d, yyyy',
  formGroupClassName: null,
  helpText: null,
  isValidMessage: '',
  label: '',
  labelClassName: null,
  placeholder: null,
  showFeedback: feedback.ALL,
  showTimeSelect: false,
  showTimeSelectOnly: false,
  timeCaption: null,
  timeIntervals: null,
  tooltipText: null,
  tooltipPosition: 'right'
};

export default connect(DatePicker);
