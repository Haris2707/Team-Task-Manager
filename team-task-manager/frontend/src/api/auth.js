import API from './axios';

export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  signup: (userData) => API.post('/auth/signup', userData),
  getMe: () => API.get('/auth/me'),
  getAllUsers: () => API.get('/auth/users')
};