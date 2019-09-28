import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { connect } from 'formik';
import classNames from 'classnames';
import {
  getValidityClass,
  FeedbackMessage,
  feedback
} from 'components/forms/form-helper';
import Tooltip from 'components/common/utils/Tooltip';
import Humanize from 'humanize-plus';
import { dashedLowerCase } from 'utils/helpers';

const Select = ({
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
  options,
  blankOption,
  showFeedback,
  tooltipText,
  tooltipPosition
}) => {
  return (
    <div
      className={classNames('form-group', formGroupClassName, { row: inline })}
    >
      <label className={labelClassName} htmlFor={name}>
        {label}{' '}
        <Tooltip name={name} position={tooltipPosition} text={tooltipText} />
      </label>
      <div className={inputSizeClassName}>
        <Field
          aria-describedby={name}
          className={classNames(
            'form-control',
            inputClassName,
            getValidityClass(formik, name, showFeedback)
          )}
          component="select"
          id={name}
          name={name}
        >
          {blankOption && (
            <option key={`blankOptionfor${name}`} value="">
              {blankOption}
            </option>
          )}
          {<Select.options options={options} />}
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
};

// NB: Wrap multiple fields in .form-row and give formGroupClassname the size e.g form-group col-md-6

Select.defaultProps = {
  blankOption: null,
  formGroupClassName: null,
  helpText: null,
  inline: false,
  inputClassName: null,
  inputSizeClassName: null,
  isValidMessage: '',
  label: null,
  labelClassName: 12,
  name: null,
  showFeedback: feedback.ALL,
  tooltipText: null,
  tooltipPosition: 'right'
};

Select.propTypes = {
  blankOption: PropTypes.string,
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
  options: PropTypes.array.isRequired,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string
};

Select.options = ({ options }) => {
  return options.map(({ label, value }) => {
    if (!(label || value)) return null;
    const optionValue = value || dashedLowerCase(label);
    const optionLabel = label || Humanize.capitalize(value);
    console.log('optionValue', optionValue);
    return (
      <option key={optionValue} value={optionValue}>
        {optionLabel}
      </option>
    );
  });
};
export default connect(Select);
