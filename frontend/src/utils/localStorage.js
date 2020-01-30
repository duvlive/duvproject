import store from 'store2';

const PREFIX = 'duvlive';
const TOKEN = `${PREFIX}-token`;

export const storeToken = token => store(TOKEN, token);
export const getToken = () => store(TOKEN);
export const clearStorage = () => store(false);
