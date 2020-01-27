import * as React from 'react';
import PropTypes from 'prop-types';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { getCurrentUser } from 'utils/localStorage';

const INITIAL_STATE = {
  name: 'Haruna',
  profileImg:
    (getCurrentUser() && getCurrentUser().profileImgURL) || ProfileAvatar
};

// CONTEXT
let UserContext = React.createContext();

// REDUCERS
let reducer = (state, action) => {
  console.log('userState', state);
  console.log('userAction', action);
  switch (action.type) {
    case 'reset':
      return INITIAL_STATE;
    case 'save-user':
      return { ...state, name: action.name };
    case 'update-profile-image':
      return { ...state, profileImg: action.link };
    default:
      return state;
  }
};

// PROVIDER
let UserContextProvider = props => {
  let [userState, userDispatch] = React.useReducer(reducer, INITIAL_STATE);
  let value = { userState, userDispatch };
  console.log('userState', userState);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.any.isRequired
};

// CONSUMER
let UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer };
