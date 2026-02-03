import Cookies from 'js-cookie';

/**
 * Set authentication token in cookie
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
};

/**
 * Get authentication token from cookie
 * @returns {string|undefined} - JWT token or undefined
 */
export const getToken = () => {
  return Cookies.get('token');
};

/**
 * Remove authentication token from cookie
 */
export const removeToken = () => {
  Cookies.remove('token');
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user has a token
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Store user data in localStorage
 * @param {object} user - User object
 */
export const setUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

/**
 * Get user data from localStorage
 * @returns {object|null} - User object or null
 */
export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

/**
 * Logout user - Clear token and user data
 */
export const logout = () => {
  removeToken();
  removeUser();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
