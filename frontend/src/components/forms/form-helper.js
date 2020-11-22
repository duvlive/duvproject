import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';

const validityOptions = {
  valid: 'is-valid',
  invalid: 'is-invalid',
};

const feebackOptions = {
  valid: 'valid-feedback',
  invalid: 'invalid-feedback',
};

const showErrors = ({ showFeedback, formik }) => {
  return (
    formik.submitCount > 0 || // Errors should be shown if form is submitted
    showFeedback === feedback.ALL ||
    showFeedback === feedback.ERROR
  );
};

const showSuccess = ({ showFeedback, formik }) => {
  return showFeedback === feedback.ALL || showFeedback === feedback.SUCCESS;
};

export const feedback = {
  ALL: 'ALL',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  NONE: 'NONE',
};

export const getValidityClass = (
  formik,
  name,
  showFeedback,
  options = validityOptions
) => {
  const error = getIn(formik.errors, name);
  const touch = getIn(formik.touched, name);
  if (!!touch && !!error && showErrors({ formik, showFeedback })) {
    // mark as invalid
    return options.invalid;
  } else if (!!touch && !error && showSuccess({ showFeedback, formik })) {
    // mark as valid
    return options.valid;
  }
  return; //not touched
};

export const FeedbackMessage = ({
  formik,
  helpText,
  name,
  showFeedback,
  validMessage,
}) => {
  const className = getValidityClass(
    formik,
    name,
    showFeedback,
    feebackOptions
  );
  const message = getIn(formik.errors, name) || validMessage;
  return className && message ? (
    <div className={className}>
      {typeof message === 'object' ? message.date : message}
    </div>
  ) : (
    helpText && <HelpText name={name} text={helpText} />
  );
};

FeedbackMessage.propTypes = {
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  name: PropTypes.string.isRequired,
  showFeedback: PropTypes.string.isRequired,
  validMessage: PropTypes.string,
};

FeedbackMessage.defaultProps = {
  helpText: null,
  validMessage: null,
};

export const HelpText = ({ name, text }) => (
  <small className="form-text text-muted" id={`${name}-help`}>
    {text}
  </small>
);

HelpText.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export const DisplayFormikState = (props) => {
  const displayFormikValues = (
    <div style={{ margin: '1rem 0' }}>
      <pre
        style={{
          color: '#aaa',
          fontSize: '.65rem',
          border: '1px solid #666',
          marginTop: '5rem',
          padding: '1.5rem 2rem',
        }}
      >
        {props.showAll ? (
          <div>
            <strong>props</strong> = {JSON.stringify(props, null, 2)}
          </div>
        ) : (
          JSON.stringify(props.values, null, 2)
        )}
      </pre>
    </div>
  );
  if (process.env.NODE_ENV === 'production') return null;
  return !props.hide && displayFormikValues;
};

DisplayFormikState.propTypes = {
  hide: PropTypes.bool,
  showAll: PropTypes.bool,
  values: PropTypes.object.isRequired,
};

DisplayFormikState.defaultProps = {
  showAll: false,
  hide: false,
};

export const setInitialValues = (schema, initialValues = {}) => {
  const values = {};
  Object.keys(schema).forEach((key) => {
    if (initialValues[key] !== null && initialValues[key] !== undefined) {
      values[key] = initialValues[key];
    } else {
      values[key] = '';
    }
  });
  return values;
};
