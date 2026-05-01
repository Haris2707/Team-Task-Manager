import API from './axios';

export const tasksAPI = {
  getTasks: (params) => API.get('/tasks', { params }),
  createTask: (taskData) => API.post('/tasks', taskData),
  updateTask: (id, taskData) => API.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => API.delete(`/tasks/${id}`),
  getDashboard: () => API.get('/tasks/dashboard')
};