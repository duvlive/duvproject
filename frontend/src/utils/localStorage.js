import store from 'store2';

const PREFIX = 'duvlive';
const CURRENT_USER = `${PREFIX}-user`;
const TOKEN = `${PREFIX}-token`;

export const storeCurrentUser = data => store(CURRENT_USER, data);
export const getCurrentUser = () => store(CURRENT_USER);
export const storeToken = token => store(TOKEN, token);
export const getToken = () => store(TOKEN);
export const clearStorage = () => {
  console.log('clearStorage');
  return store(false);
};
