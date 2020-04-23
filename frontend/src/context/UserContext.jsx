import * as React from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  phoneNumber2: '',
  type: null,
  referral: '',
  profileImg: '',
  isLoggedIn: false,
  firstTimeLogin: null,
  entertainerProfile: {
    entertainerType: null,
    approved: null,
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
    availableFor: '[]',
  },
  bankDetail: {
    accountName: '',
    bankName: '',
    accountNumber: '',
  },
  contacts: [
    {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      relationship: '',
      type: 1,
    },
    {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      relationship: '',
      type: 2,
    },
  ],
  identification: {
    idType: '',
    idNumber: '',
    issueDate: '',
    expiryDate: '',
  },
  approvalComment: {
    entertainerProfile: null,
    bankAccount: null,
    contact: null,
    youTube: null,
    identification: null,
  },
  galleries: [],
  events: null,
};

// CONTEXT
let UserContext = React.createContext();

// REDUCERS
let reducer = (state, action) => {
  if (process.env.NODE_ENV === 'development') {
    console.info('%c[USER CONTEXT STATE] state', 'color: blue', state);
    console.info('%c[USER CONTEXT ACTION] action', 'color: green', action);
  }
  switch (action.type) {
    case 'no-token':
    case 'user-logout':
      return INITIAL_STATE;
    case 'user-info':
    case 'user-login':
    case 'user-social-media-login':
    case 'user-profile-update':
    case 'user-contact-update':
    case 'entertainer-profile-update':
    case 'entertainer-youtube-channel':
      return { ...state, ...action.user, isLoggedIn: true };
    case 'user-hide-first-time-text':
      return { ...state, ...action.user, firstTimeLogin: false };
    case 'update-user-profile-image':
    case 'user-profile-image':
      return { ...state, profileImg: action.imageURL };

    case 'add-new-event':
    case 'add-entertainer-to-event':
      return { ...state, events: [action.event, ...state.events] };
    default:
      return state;
  }
};

// PROVIDER
let UserContextProvider = (props) => {
  let [userState, userDispatch] = React.useReducer(reducer, INITIAL_STATE);
  let value = { userState, userDispatch };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

// CONSUMER - ONLY USEFUL IN CLASSES
let UserContextConsumer = UserContext.Consumer;

// using in a function
// let updateUser = name => () => userDispatch({ type: 'save-user', name });
// <button className="btn btn-primary" onClick={updateUser('Oladayo')}></button>;

export { UserContext, UserContextProvider, UserContextConsumer };
