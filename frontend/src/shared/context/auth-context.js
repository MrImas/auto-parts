import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  userId: null,
  token: null,
  userName: 'guest',
  login: () => {},
  logout: () => {},
});
