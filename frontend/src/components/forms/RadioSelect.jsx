import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field, getIn } from 'formik';
import classNames from 'classnames';
import { FeedbackMessage } from 'components/forms/form-helper';
// import Tooltip from 'components/common/utils/Tooltip';

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
        id={`${name}label `}
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
  name,
  options,
  inputClassName,
  showFeedback,
  inline
}) => {
  const fieldValue = getIn(formik.values, name);
  const radios = options.map(({ label, value }) => (
    <Radio
      checked={fieldValue === value}
      custom={custom}
      formGroupLabelClassName={formGroupLabelClassName}
      formik={formik}
      inline={inline}
      inputClassName={inputClassName}
      key={value}
      label={label}
      name={name}
      showFeedback={showFeedback}
      value={value}
    />
  ));

  return (
    <>
      {radios}
      {showFeedback && (
        <FeedbackMessage
          formik={formik}
          helpText={'helpText'}
          name={name}
          validMessage={'isValidMessage'}
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
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  showFeedback: PropTypes.bool
};

RadioSelect.defaultProps = {
  custom: false,
  formGroupLabelClassName: '',
  helpText: null,
  inline: false,
  inputClassName: '',
  isValidMessage: null,
  showFeedback: true
};

// Using with Legend
//  <fieldset class="form-group">
//    <div class="row">
//      <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
//        <div class="col-sm-10">
//            Put radioselect component here
// ...

export default connect(RadioSelect);
