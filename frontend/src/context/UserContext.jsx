import * as React from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  type: 1,
  referral: '',
  profileImg: '',
  isLoggedIn: false,
  entertainerProfile: {
    entertainerType: null,
    approved: false,
    about: '',
    stageName: '',
    location: '',
    yearStarted: '',
    willingToTravel: false,
    eventType: null,
    youTubeChannel: null,
    city: '',
    baseCharges: '',
    preferredCharges: '',
    availableFor: '[]'
  }
};

// CONTEXT
let UserContext = React.createContext();

// REDUCERS
let reducer = (state, action) => {
  console.log('userState', state);
  console.log('userAction', action);
  switch (action.type) {
    case 'user-logout':
      return INITIAL_STATE;
    case 'user-info':
    case 'user-login':
    case 'user-profile-update':
      return { ...state, ...action.user, isLoggedIn: true };
    case 'user-profile-image':
      return { ...state, profileImg: action.link };
    default:
      return state;
  }
};

// PROVIDER
let UserContextProvider = props => {
  let [userState, userDispatch] = React.useReducer(reducer, INITIAL_STATE);
  let value = { userState, userDispatch };
  console.log('userState for provider', userState);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.any.isRequired
};

// CONSUMER - ONLY USEFUL IN CLASSES
let UserContextConsumer = UserContext.Consumer;

// using in a function
// let updateUser = name => () => userDispatch({ type: 'save-user', name });
// <button className="btn btn-primary" onClick={updateUser('Oladayo')}></button>;

export { UserContext, UserContextProvider, UserContextConsumer };
