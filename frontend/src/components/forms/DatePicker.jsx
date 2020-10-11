import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field } from 'formik';
import classNames from 'classnames';
import {
  getValidityClass,
  FeedbackMessage,
  feedback,
} from 'components/forms/form-helper';
import Label from './Label';
import ReactDatePicker from 'react-datepicker';
import { getIn } from 'formik';
import { isValid, parse } from 'date-fns';

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
  optional,
  placeholder,
  showFeedback,
  showTimeSelect,
  showTimeSelectOnly,
  timeCaption,
  timeIntervals,
  tooltipText,
  tooltipPosition,
  ...props
}) => (
  <div className={classNames('form-group', formGroupClassName)}>
    <div>
      <Label
        className={labelClassName}
        name={name}
        optional={optional}
        text={label}
        tooltipPosition={tooltipPosition}
        tooltipText={tooltipText}
      />
      <Field name={name}>
        {({ form }) => {
          let selectedValue = null;

          if (
            typeof getIn(formik.values, name) === 'object' &&
            getIn(formik.values, name).date &&
            isValid(parse(getIn(formik.values, name).date))
          ) {
            selectedValue = parse(getIn(formik.values, name).date);
          } else if (
            getIn(formik.values, name) !== '' &&
            isValid(parse(getIn(formik.values, name)))
          ) {
            selectedValue = parse(getIn(formik.values, name));
          }

          return (
            <ReactDatePicker
              {...props}
              autoComplete="off"
              className={classNames(
                'form-control',
                className,
                getValidityClass(formik, name, showFeedback)
              )}
              dateFormat={dateFormat}
              id={name}
              name={name}
              onChange={(date) => {
                if (date) {
                  let dateTime = date.toLocaleDateString();

                  if (showTimeSelectOnly) {
                    dateTime = date.toLocaleTimeString();
                  }

                  if (showTimeSelect) {
                    dateTime = date.toLocaleString();
                  }

                  console.log('date, dateTime,', date, dateTime);

                  form.setFieldValue(name, { date, value: dateTime });
                } else {
                  form.setFieldValue(name, '');
                }
              }}
              placeholderText={placeholder}
              selected={selectedValue}
              showTimeSelect={showTimeSelect}
              showTimeSelectOnly={showTimeSelectOnly}
              timeCaption={timeCaption}
              timeIntervals={timeIntervals}
            />
          );
        }}
      </Field>
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
  optional: PropTypes.bool,
  placeholder: PropTypes.string,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  showTimeSelect: PropTypes.bool,
  showTimeSelectOnly: PropTypes.bool,
  timeCaption: PropTypes.string,
  timeIntervals: PropTypes.number,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
};

DatePicker.defaultProps = {
  className: null,
  dateFormat: 'MMMM d, yyyy',
  formGroupClassName: null,
  helpText: null,
  isValidMessage: '',
  label: '',
  labelClassName: null,
  optional: false,
  placeholder: null,
  showFeedback: feedback.ALL,
  showTimeSelect: false,
  showTimeSelectOnly: false,
  timeCaption: 'Time',
  timeIntervals: 60,
  tooltipText: null,
  tooltipPosition: 'right',
};

export default connect(DatePicker);
