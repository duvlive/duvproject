import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { COLOR_STYLE } from 'utils/constants';

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
  type: PropTypes.oneOf(COLOR_STYLE)
};

AlertMessage.defaultProps = {
  lists: [],
  message: null,
  type: COLOR_STYLE[0]
};

// AlertMessage.Text
AlertMessage.Text = ({ type, message }) => {
  return (
    <div className="small pb-4">
      {message && <div className={type}>{message && message}</div>}
    </div>
  );
};

AlertMessage.Text.propTypes = {
  message: PropTypes.any,
  type: PropTypes.oneOf(['success', 'error', 'primary'])
};

AlertMessage.Text.defaultProps = {
  message: null,
  type: 'primary'
};

export default AlertMessage;
