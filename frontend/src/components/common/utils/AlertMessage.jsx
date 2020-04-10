import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { COLOR_STYLE } from 'utils/constants';

const AlertMessage = ({ type, message, lists }) => {
  const messageList = lists && lists.map((list) => <li>{list}</li>);
  return (
    message && (
      <Alert color={type}>
        <AlertIcon type={type} />
        {message && message}
        {messageList && messageList.length > 0 && <ul>{messageList}</ul>}
      </Alert>
    )
  );
};

AlertMessage.propTypes = {
  lists: PropTypes.array,
  message: PropTypes.any,
  type: PropTypes.oneOf(COLOR_STYLE),
};

AlertMessage.defaultProps = {
  lists: [],
  message: null,
  type: COLOR_STYLE[0],
};

// AlertMessage.Text
AlertMessage.Text = ({ type, message }) => {
  return (
    <div className="small pb-4">
      {message && <div className={`text-${type}`}>{message && message}</div>}
    </div>
  );
};

AlertMessage.Text.propTypes = {
  message: PropTypes.any,
  type: PropTypes.oneOf(['success', 'error', 'primary', 'info']),
};

AlertMessage.Text.defaultProps = {
  message: null,
  type: 'primary',
};

const AlertIcon = ({ type }) => {
  const ICON = {
    success: 'ok-circled',
    error: 'cancel-circled',
    primary: 'cancel-circled',
    danger: 'cancel-circled',
    info: 'help',
    warning: 'notification',
  };
  return (
    (type && ICON[type] && (
      <span className={`alert-icon icon icon-${ICON[type]}`} />
    )) ||
    null
  );
};

AlertIcon.propTypes = {
  type: PropTypes.oneOf(['success', 'primary', 'danger', 'info', 'error']),
};

AlertIcon.defaultProps = {
  type: 'primary',
};
export default AlertMessage;
