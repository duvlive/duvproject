import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import Select from 'react-select';
import { connect } from 'formik';
import classNames from 'classnames';
import {
  getValidityClass,
  FeedbackMessage,
  feedback
} from 'components/forms/form-helper';
import Label from './Label';

const customStyles = {
  control: () => ({
    alignItems: 'center',
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'relative',
    transition: 'all 100ms',
    marginTop: '-7px',
    marginLeft: '-8px'
  }),
  indicatorSeparator: provided => ({
    ...provided,
    backgroundColor: '#86939e'
  })
};

const MultiSelect = ({
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
  placeholder,
  showFeedback,
  tooltipText,
  tooltipPosition,
  options
}) => {
  return (
    <div
      className={classNames('form-group', formGroupClassName, { row: inline })}
    >
      <Label
        className={labelClassName}
        labelLink={labelLink}
        name={name}
        optional={optional}
        text={label}
        tooltipPosition={tooltipPosition}
        tooltipText={tooltipText}
      />
      <div className={inputSizeClassName}>
        <Field name={name}>
          {({ field, form }) => {
            return (
              <Select
                className={classNames(
                  'form-control',
                  'form-control-multi-select',
                  inputClassName,
                  getValidityClass(formik, name, showFeedback)
                )}
                id={name}
                isMulti
                name={name}
                onBlur={field.onBlur}
                onChange={option => {
                  option
                    ? form.setFieldValue(
                        name,
                        option.map(item => item.value)
                      )
                    : form.setFieldValue(name, []);
                }}
                options={options}
                placeholder={placeholder}
                styles={customStyles}
                theme={theme => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    primary: '#86939e',
                    primary25: 'gray',
                    primary75: '#4C9AFF',
                    primary50: '#B2D4FF',

                    danger: '#DE350B',
                    dangerLight: '#FFBDAD',

                    neutral0: 'hsl(0, 0%, 10%)',
                    neutral5: 'hsl(0, 0%, 15%)',
                    neutral10: 'rgba(42, 141, 204, 0.5)',
                    neutral20: 'hsl(0, 0%, 30%)',
                    neutral30: 'hsl(0, 0%, 40%)',
                    neutral40: 'hsl(0, 0%, 50%)',
                    neutral50: 'hsl(0, 0%, 60%)',
                    neutral60: 'hsl(0, 0%, 70%)',
                    neutral70: 'hsl(0, 0%, 80%)',
                    neutral80: 'hsl(0, 0%, 90%)',
                    neutral90: 'hsl(0, 0%, 100%)'
                  }
                })}
                value={
                  options && field.value
                    ? options.filter(
                        option => field.value.indexOf(option.value) >= 0
                      )
                    : []
                }
              />
            );
          }}
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

MultiSelect.defaultProps = {
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
  placeholder: null,
  showFeedback: feedback.ALL,
  tooltipText: null,
  tooltipPosition: 'right',
  type: null
};

MultiSelect.propTypes = {
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  placeholder: PropTypes.string,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
  type: PropTypes.string
};

export default connect(MultiSelect);
