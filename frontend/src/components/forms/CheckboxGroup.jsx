import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field } from 'formik';
import classNames from 'classnames';
import { FeedbackMessage, feedback } from 'components/forms/form-helper';
import Tooltip from 'components/common/utils/Tooltip';
import Humanize from 'humanize-plus';
import { dashedLowerCase } from 'utils/helpers';

const genId = (name, value) => `${name}-${value}`.replace(/\./g, '-');

const Checkbox = ({
  custom,
  formGroupLabelClassName,
  inline,
  inputClassName,
  name,
  label,
  value
}) => {
  const checkBoxId = genId(name, value);
  return (
    <div
      className={classNames(
        { 'form-check': !inline && !custom },
        { 'form-check-inline': inline && !custom },
        { 'custom-control custom-radio': custom },
        { ' custom-control-inline': inline && custom }
      )}
    >
      <Field name={name}>
        {({ field, form }) => {
          const fieldValue = field.value || [];
          return (
            <input
              checked={fieldValue.includes(value)}
              className={classNames(
                inputClassName,
                {
                  'form-check-input': !custom
                },
                {
                  'custom-control-input': custom
                }
              )}
              id={checkBoxId}
              name={name}
              onChange={() => {
                if (fieldValue.includes(value)) {
                  const nextValue = fieldValue.filter(val => val !== value);
                  form.setFieldValue(name, nextValue);
                } else {
                  const nextValue = fieldValue.concat(value);
                  form.setFieldValue(name, nextValue);
                }
              }}
              type="checkbox"
              value={value}
            />
          );
        }}
      </Field>
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
        htmlFor={checkBoxId}
        id={`${checkBoxId}-label `}
      >
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  custom: PropTypes.bool.isRequired,
  formGroupLabelClassName: PropTypes.string.isRequired,
  inline: PropTypes.bool.isRequired,
  inputClassName: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
};

Checkbox.defaultProps = {
  label: null,
  value: null
};

const CheckboxGroup = ({
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
  const checkedGroup = options.map(({ label, value }) => {
    if (!(label || value)) return null;
    const optionValue = value || dashedLowerCase(label);
    const optionLabel = label || Humanize.capitalize(value);
    return (
      <Checkbox
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
        <CheckboxGroup.withLabel
          label={label}
          labelSizeClassName={labelSizeClassName}
          name={name}
          radioSizeClassName={radioSizeClassName}
          tooltipPosition={tooltipPosition}
          tooltipText={tooltipText}
        >
          {checkedGroup}
        </CheckboxGroup.withLabel>
      ) : (
        checkedGroup
      )}
      <FeedbackMessage
        formik={formik}
        helpText={helpText}
        name={name}
        showFeedback={showFeedback}
        validMessage={isValidMessage}
      />
    </>
  );
};

CheckboxGroup.propTypes = {
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
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string
};

CheckboxGroup.defaultProps = {
  custom: false,
  formGroupLabelClassName: '',
  helpText: null,
  inline: false,
  inputClassName: '',
  isValidMessage: null,
  label: null,
  labelSizeClassName: 'col-sm-2',
  radioSizeClassName: 'col-sm-10',
  showFeedback: feedback.ALL,
  tooltipPosition: 'right',
  tooltipText: null
};

CheckboxGroup.withLabel = ({
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

CheckboxGroup.withLabel.propTypes = {
  children: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  labelSizeClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  radioSizeClassName: PropTypes.string.isRequired,
  tooltipPosition: PropTypes.string.isRequired,
  tooltipText: PropTypes.string
};

CheckboxGroup.withLabel.defaultProps = {
  tooltipText: null
};

export default connect(CheckboxGroup);
