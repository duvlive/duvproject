import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field, getIn } from 'formik';
import classNames from 'classnames';
import { FeedbackMessage } from 'components/forms/form-helper';
import Tooltip from 'components/common/utils/Tooltip';
import Humanize from 'humanize-plus';
import { dashedLowerCase } from 'utils/helpers';

const genId = (name, value) => `${name}-${value}`.replace(/\./g, '-');

const Radio = ({
  checked,
  custom,
  formGroupLabelClassName,
  inline,
  inputClassName,
  name,
  label,
  value
}) => {
  const radioId = genId(name, value);
  return (
    <div
      className={classNames(
        { 'form-check': !inline && !custom },
        { 'form-check-inline': inline && !custom },
        { 'custom-control custom-radio': custom },
        { ' custom-control-inline': inline && custom }
      )}
    >
      <Field
        checked={checked}
        className={classNames(
          inputClassName,
          {
            'form-check-input': !custom
          },
          {
            'custom-control-input': custom
          }
        )}
        id={radioId}
        name={name}
        type="radio"
        value={value}
      />
      <label
        className={classNames(
          formGroupLabelClassName,
          {
            'custom-control-label': custom
          },
          {
            'form-check-label': !custom
          }
        )}
        htmlFor={radioId}
        id={`${radioId}-label `}
      >
        {label}
      </label>
    </div>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  custom: PropTypes.bool.isRequired,
  formGroupLabelClassName: PropTypes.string.isRequired,
  inline: PropTypes.bool.isRequired,
  inputClassName: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
};

Radio.defaultProps = {
  checked: false,
  label: null,
  value: null
};

const RadioSelect = ({
  custom,
  formGroupLabelClassName,
  formik,
  helpText,
  inline,
  inputClassName,
  isValidMessage,
  label,
  labelSizeClassName,
  name,
  options,
  radioSizeClassName,
  showFeedback,
  tooltipPosition,
  tooltipText
}) => {
  const fieldValue = getIn(formik.values, name);
  const radioGroup = options.map(({ label, value }) => {
    if (!(label || value)) return null;
    const optionValue = value || dashedLowerCase(label);
    const optionLabel = label || Humanize.capitalize(value);
    return (
      <Radio
        checked={fieldValue === optionValue}
        custom={custom}
        formGroupLabelClassName={formGroupLabelClassName}
        formik={formik}
        inline={inline}
        inputClassName={inputClassName}
        key={optionValue}
        label={optionLabel}
        name={name}
        showFeedback={showFeedback}
        value={optionValue}
      />
    );
  });

  return (
    <>
      {label ? (
        <RadioSelect.withLabel
          label={label}
          labelSizeClassName={labelSizeClassName}
          name={name}
          radioSizeClassName={radioSizeClassName}
          tooltipPosition={tooltipPosition}
          tooltipText={tooltipText}
        >
          {radioGroup}
        </RadioSelect.withLabel>
      ) : (
        radioGroup
      )}
      {showFeedback && (
        <FeedbackMessage
          formik={formik}
          helpText={helpText}
          name={name}
          validMessage={isValidMessage}
        />
      )}
    </>
  );
};

RadioSelect.propTypes = {
  custom: PropTypes.bool,
  formGroupLabelClassName: PropTypes.string,
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  inline: PropTypes.bool,
  inputClassName: PropTypes.string,
  isValidMessage: PropTypes.string,
  label: PropTypes.string,
  labelSizeClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  radioSizeClassName: PropTypes.string,
  showFeedback: PropTypes.bool,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string
};

RadioSelect.defaultProps = {
  custom: false,
  formGroupLabelClassName: '',
  helpText: null,
  inline: false,
  inputClassName: '',
  isValidMessage: null,
  label: null,
  labelSizeClassName: 'col-sm-2',
  radioSizeClassName: 'col-sm-10',
  showFeedback: true,
  tooltipPosition: 'right',
  tooltipText: null
};

RadioSelect.withLabel = ({
  children,
  label,
  labelSizeClassName,
  name,
  radioSizeClassName,
  tooltipText,
  tooltipPosition
}) => {
  return (
    <fieldset className="form-group">
      <div className="row">
        <legend className={`col-form-label ${labelSizeClassName} pt-0`}>
          {label}{' '}
          <Tooltip name={name} position={tooltipPosition} text={tooltipText} />
        </legend>
        <div className={radioSizeClassName}>{children}</div>
      </div>
    </fieldset>
  );
};

RadioSelect.withLabel.propTypes = {
  children: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  labelSizeClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  radioSizeClassName: PropTypes.string.isRequired,
  tooltipPosition: PropTypes.string.isRequired,
  tooltipText: PropTypes.string
};

RadioSelect.withLabel.defaultProps = {
  tooltipText: null
};

export default connect(RadioSelect);
