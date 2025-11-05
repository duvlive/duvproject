import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { connect } from 'formik';
import classNames from 'classnames';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  getValidityClass,
  FeedbackMessage,
  feedback
} from 'components/forms/form-helper';
import Label from './Label';

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
  labelLink,
  labelClassName,
  name,
  optional,
  showFeedback,
  tooltipText,
  tooltipPosition,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine field type dynamically
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={classNames('form-group', formGroupClassName, { row: inline })}>
      <Label
        className={labelClassName}
        labelLink={labelLink}
        name={name}
        optional={optional}
        text={label}
        tooltipPosition={tooltipPosition}
        tooltipText={tooltipText}
      />

      <div className={classNames(inputSizeClassName, 'position-relative')}>
        <Field
          aria-describedby={name}
          autoComplete={autoComplete}
          className={classNames(
            'form-control',
            inputClassName,
            getValidityClass(formik, name, showFeedback)
          )}
          id={name}
          name={name}
          type={inputType}
          {...props}
        />

        {/* Password toggle button */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="position-absolute"
            style={{
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
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
};


// NB: Wrap multiple fields in .form-row and give formGroupClassname the size e.g form-group col-md-6

Input.defaultProps = {
  autoComplete: '',
  formGroupClassName: null,
  helpText: null,
  inline: false,
  inputClassName: null,
  inputSizeClassName: null,
  isValidMessage: '',
  label: null,
  labelClassName: null,
  labelLink: null,
  optional: false,
  showFeedback: feedback.ALL,
  tooltipText: null,
  tooltipPosition: 'right',
  type: 'text'
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
  labelClassName: PropTypes.string,
  labelLink: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
  }),
  name: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
  type: PropTypes.string
};

export default connect(Input);
