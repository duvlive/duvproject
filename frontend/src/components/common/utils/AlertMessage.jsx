import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const AlertMessage = ({ type, message, lists }) => {
  const messageList = lists && lists.map(list => <li>{list}</li>);
  return (
    message && (
      <Alert color={type}>
        {message && message}
        {messageList && messageList.length > 0 && <ul>{messageList}</ul>}
      </Alert>
    )
  );
};
AlertMessage.propTypes = {
  lists: PropTypes.array,
  message: PropTypes.any,
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ])
};

AlertMessage.defaultProps = {
  lists: [],
  message: null,
  type: 'danger'
};
export default AlertMessage;
