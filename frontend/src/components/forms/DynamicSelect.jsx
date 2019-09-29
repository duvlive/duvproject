import { connect, getIn } from 'formik';
import { any, object, string, func } from 'prop-types';
import React from 'react';
import Select from 'components/forms/Select';

const DynamicSelect = ({
  formik: { values, setFieldValue },
  name,
  defaultValue,
  dependentOn,
  options,
  ...props
}) => {
  const value = getIn(values, dependentOn);
  const newOptions = !value ? defaultValue : options(value);
  return <Select {...props} name={name} options={newOptions} />;
};

DynamicSelect.propTypes = {
  defaultValue: any,
  dependentOn: string.isRequired,
  formik: object.isRequired,
  name: string.isRequired,
  options: func.isRequired
};

DynamicSelect.defaultProps = {
  defaultValue: []
};

export default connect(DynamicSelect);
