const TOKEN_NAME = 'token';

export const getToken = () => localStorage.getItem(TOKEN_NAME);

export const saveToken = token => localStorage.setItem(TOKEN_NAME, token);

export const removeToken = () => localStorage.removeItem(TOKEN_NAME);
