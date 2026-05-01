import API from './axios';

export const projectsAPI = {
  getProjects: () => API.get('/projects'),
  createProject: (projectData) => API.post('/projects', projectData),
  updateProject: (id, projectData) => API.put(`/projects/${id}`, projectData),
  deleteProject: (id) => API.delete(`/projects/${id}`),
  addMember: (id, userId) => API.post(`/projects/${id}/members`, { userId })
};