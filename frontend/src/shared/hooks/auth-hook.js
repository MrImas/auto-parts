import { useState, useEffect, useCallback } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState();

  const login = useCallback((uid, token, isAdmin, expireIn) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setIsAdmin(isAdmin);
    setToken(token);
    const expirationDate =
      expireIn || new Date(new Date().getTime() + 1000 * 60 * 60);
    setExpirationDate(expirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        isAdmin,
        expirationDate: expirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserId(null);
    setToken(false);
    setExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (
      userData &&
      userData.token &&
      userData.userId &&
      userData.expirationDate
    ) {
      login(
        userData.userId,
        userData.token,
        userData.isAdmin,
        new Date(userData.expirationDate)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, expirationDate, logout]);

  return [isLoggedIn, isAdmin, userId, token, login, logout];
};
