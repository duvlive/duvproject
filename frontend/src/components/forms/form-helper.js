import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';

const validityOptions = {
  valid: 'is-valid',
  invalid: 'is-invalid'
};

const feebackOptions = {
  valid: 'valid-feedback',
  invalid: 'invalid-feedback'
};

export const getValidityClass = (formik, name, options = validityOptions) => {
  const error = getIn(formik.errors, name);
  const touch = getIn(formik.touched, name);
  if (!!touch && !!error) {
    // mark as invalid
    return options.invalid;
  } else if (!!touch && !error) {
    // mark as valid
    return options.valid;
  }
  return; //not touched
};

export const FeedbackMessage = ({ formik, name, helpText, validMessage }) => {
  const className = getValidityClass(formik, name, feebackOptions);
  const message = getIn(formik.errors, name) || validMessage;

  return className && message ? (
    <div className={className}>{message}</div>
  ) : (
    helpText && <HelpText name={name} text={helpText} />
  );
};

FeedbackMessage.propTypes = {
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  name: PropTypes.string.isRequired,
  validMessage: PropTypes.string
};

FeedbackMessage.defaultProps = {
  helpText: null,
  validMessage: null
};

export const HelpText = ({ name, text }) => (
  <small className="form-text text-muted" id={`${name}-help`}>
    {text}
  </small>
);

HelpText.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
