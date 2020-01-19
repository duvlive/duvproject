import store from 'store2';

const PREFIX = 'duvlive';
const CURRENT_USER = `${PREFIX}-user`;

export const storeCurrentUser = data => store(CURRENT_USER, data);
export const getCurrentUser = () => store(CURRENT_USER);
export const clearStorage = () => store(false);
