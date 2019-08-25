import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Link } from '@reach/router';
import { connect } from 'formik';
import classNames from 'classnames';
import {
  getValidityClass,
  FeedbackMessage,
  feedback
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
  labelLink,
  labelClassName,
  name,
  placeholder,
  showFeedback,
  tooltipText,
  tooltipPosition,
  type
}) => {
  return (
    <div
      className={classNames('form-group', formGroupClassName, { row: inline })}
    >
      <label className={labelClassName} htmlFor={name}>
        {label}{' '}
        <Tooltip name={name} position={tooltipPosition} text={tooltipText} />
        {labelLink && (
          <Link className="float-right" to={labelLink.to}>
            {labelLink.text}
          </Link>
        )}
      </label>
      <div className={inputSizeClassName}>
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
          placeholder={placeholder}
          type={type}
        />
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
  placeholder: null,
  showFeedback: feedback.ALL,
  tooltipText: null,
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
  labelClassName: PropTypes.string,
  labelLink: PropTypes.shape({
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
  type: PropTypes.string
};

export default connect(Input);

// TODO:
// - Create label component
// - Use name for label if not given
