import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field } from 'formik';
import classNames from 'classnames';
import { FeedbackMessage, feedback } from 'components/forms/form-helper';
import Label from './Label';
import Ratings from 'components/custom/Ratings';

const RatingsField = ({
  name,
  className,
  helpText,
  isValidMessage,
  formGroupClassName,
  formik,
  labelClassName,
  label,
  optional,
  showFeedback,
  total,
  tooltipText,
  tooltipPosition,
  value,
}) => {
  return (
    <div className={classNames('form-group', formGroupClassName)}>
      <Label
        className={`${labelClassName} stars__review--label`}
        name={name}
        optional={optional}
        text={label}
        tooltipPosition={tooltipPosition}
        tooltipText={tooltipText}
      />
      <Field name={name}>
        {({ field, form }) => {
          const fieldValue = field.value || 0;
          return (
            <Ratings
              className={`${className} react-rater stars__review`}
              onRate={({ rating }) => {
                form.setFieldValue(name, rating);
              }}
              rating={fieldValue}
              total={total}
            />
          );
        }}
      </Field>
      <div>
        <FeedbackMessage
          formik={formik}
          helpText={helpText}
          name={name}
          showFeedback={showFeedback}
          validMessage={isValidMessage}
        />
      </div>
    </div>
  );
};

RatingsField.propTypes = {
  className: PropTypes.string,
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
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
  total: PropTypes.number,
  value: PropTypes.array,
};

RatingsField.defaultProps = {
  className: null,
  formGroupClassName: null,
  helpText: null,
  isValidMessage: '',
  label: null,
  labelClassName: null,
  optional: false,
  placeholder: null,
  showFeedback: feedback.ALL,
  tooltipPosition: 'right',
  tooltipText: null,
  total: 5,
  value: [],
};

export default connect(RatingsField);
