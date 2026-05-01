import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { projectsAPI } from '../api/projects';
import { authAPI } from '../api/auth';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import './Projects.css';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: [],
    deadline: ''
  });

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await authAPI.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectsAPI.updateProject(editingProject._id, formData);
      } else {
        await projectsAPI.createProject(formData);
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      members: [],
      deadline: ''
    });
    setEditingProject(null);
    setShowModal(false);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description || '',
      members: project.members.map(m => m._id),
      deadline: project.deadline ? format(new Date(project.deadline), 'yyyy-MM-dd') : ''
    });
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'completed': return '#6366f1';
      case 'on-hold': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="projects-loading">
        <div className="spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="projects">
      <div className="projects-header">
        <div>
          <h1>Projects</h1>
          <p>Manage your team projects and collaborate effectively</p>
        </div>
        <button 
          className="create-btn"
          onClick={() => setShowModal(true)}
        >
          <FiPlus />
          New Project
        </button>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <div className="project-header">
              <div className="project-info">
                <h3>{project.name}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
                </span>
              </div>
              {(user?.role === 'admin' || project.owner._id === user?._id) && (
                <div className="project-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => openEditModal(project)}
                  >
                    <FiEdit2 />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete(project._id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )}
            </div>

            <p className="project-description">
              {project.description || 'No description provided'}
            </p>

            <div className="project-meta">
              <div className="meta-item">
                <FiUser />
                <span>Owner: {project.owner.name}</span>
              </div>
              <div className="meta-item">
                <FiUsers />
                <span>{project.members.length} members</span>
              </div>
              {project.deadline && (
                <div className="meta-item">
                  <FiCalendar />
                  <span>Due: {format(new Date(project.deadline), 'MMM dd, yyyy')}</span>
                </div>
              )}
            </div>

            <div className="project-members">
              {project.members.slice(0, 3).map(member => (
                <div key={member._id} className="member-avatar" title={member.name}>
                  {member.name.charAt(0).toUpperCase()}
                </div>
              ))}
              {project.members.length > 3 && (
                <div className="member-avatar more">
                  +{project.members.length - 3}
                </div>
              )}
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="empty-state">
            <FiUsers size={48} />
            <h3>No projects yet</h3>
            <p>Create your first project to get started</p>
            <button 
              className="create-btn"
              onClick={() => setShowModal(true)}
            >
              <FiPlus />
              Create Project
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="project-form">
              <div className="form-group">
                <label htmlFor="name">Project Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="members">Team Members</label>
                <select
                  id="members"
                  multiple
                  value={formData.members}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({...formData, members: selected});
                  }}
                >
                  {users.map(user => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
                <small>Hold Ctrl/Cmd to select multiple members</small>
              </div>

              <div className="form-group">
                <label htmlFor="deadline">Deadline (Optional)</label>
                <input
                  type="date"
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;