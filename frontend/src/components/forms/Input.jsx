import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { connect } from 'formik';
import classNames from 'classnames';
import {
  getValidityClass,
  FeedbackMessage
} from 'components/forms/form-helper';
import Tooltip from 'components/common/utils/Tooltip';

const Input = ({
  autoComplete,
  formGroupClassName,
  formik,
  helpText,
  inline,
  inputClassName,
  inputSizeClassName,
  isValidMessage,
  label,
  labelClassName,
  name,
  placeholder,
  showFeedback,
  tooltip,
  tooltipPosition,
  type
}) => {
  return (
    <div
      className={classNames('form-group', formGroupClassName, { row: inline })}
    >
      <label className={labelClassName} htmlFor={name}>
        {label}{' '}
        <Tooltip message={tooltip} name={name} position={tooltipPosition} />
      </label>
      <div className={inputSizeClassName}>
        <Field
          aria-describedby={name}
          autoComplete={autoComplete}
          className={classNames(
            'form-control',
            inputClassName,
            showFeedback && getValidityClass(formik, name)
          )}
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
        />
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
};

// NB: Wrap multiple fields in .form-row and give formGroupClassname the size e.g form-group col-md-6

Input.defaultProps = {
  autoComplete: '',
  formGroupClassName: null,
  formGroupSize: 12,
  helpText: null,
  inline: false,
  inputClassName: null,
  inputSizeClassName: null,
  isValidMessage: '',
  label: null,
  labelClassName: 12,
  name: null,
  placeholder: null,
  showFeedback: true,
  tooltip: null,
  tooltipPosition: 'right',
  type: null
};

Input.propTypes = {
  autoComplete: PropTypes.string,
  formGroupClassName: PropTypes.string,
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  inline: PropTypes.bool,
  inputClassName: PropTypes.string,
  inputSizeClassName: PropTypes.number,
  isValidMessage: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.number,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  showFeedback: PropTypes.bool,
  tooltip: PropTypes.string,
  tooltipPosition: PropTypes.string,
  type: PropTypes.string
};

export default connect(Input);
