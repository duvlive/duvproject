import store from 'store2';

const PREFIX = 'duvlive';
const TOKEN = `${PREFIX}-token`;
const USER_TYPE = `${PREFIX}-user-type`;
const HIRED_ENTERTAINER = `${PREFIX}-hired-entertainer`;
const NOTIFICATION = `${PREFIX}-notification`;

export const storeToken = (token) => store(TOKEN, token);
export const getTokenFromStore = () => store(TOKEN);
export const storeUserType = (type) => store(USER_TYPE, type);
export const getUserTypeFromStore = () =>
  store(USER_TYPE) || store(USER_TYPE) === 0 ? store(USER_TYPE) : '1';

// Hired Entertainer
export const storeHiredEntertainer = (entertainer) =>
  store(HIRED_ENTERTAINER, entertainer);
export const getHiredEntertainerFromStore = () => store(HIRED_ENTERTAINER);
export const removeHiredEntertainerFromStore = () =>
  store.remove(HIRED_ENTERTAINER);

// Cancelled Notification
export const storeCancelledNotification = (notification) =>
  store(NOTIFICATION, notification);
export const getCancelledNotificationFromStore = () => store(NOTIFICATION);

export const clearStorage = () => {
  store.remove(TOKEN);
  store.remove(USER_TYPE);
};
