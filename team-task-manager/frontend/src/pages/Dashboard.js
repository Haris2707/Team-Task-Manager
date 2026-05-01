import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { tasksAPI } from '../api/tasks';
import { FiCheckSquare, FiClock, FiAlertTriangle, FiTrendingUp, FiUsers, FiFolder } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await tasksAPI.getDashboard();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats?.total || 0,
      icon: FiCheckSquare,
      color: '#667eea',
      bgColor: '#f0f2ff'
    },
    {
      title: 'In Progress',
      value: stats?.inProgress || 0,
      icon: FiClock,
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      title: 'Completed',
      value: stats?.done || 0,
      icon: FiTrendingUp,
      color: '#10b981',
      bgColor: '#ecfdf5'
    },
    {
      title: 'Overdue',
      value: stats?.overdue || 0,
      icon: FiAlertTriangle,
      color: '#ef4444',
      bgColor: '#fef2f2'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}! 👋</h1>
          <p>Here's what's happening with your tasks today.</p>
        </div>
        <div className="user-badge">
          <span className="role-badge">{user?.role}</span>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="stat-content">
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
              <div 
                className="stat-icon"
                style={{ backgroundColor: stat.bgColor, color: stat.color }}
              >
                <stat.icon />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Task Status Overview</h2>
          <div className="status-overview">
            <div className="status-item">
              <div className="status-bar">
                <div 
                  className="status-fill todo"
                  style={{ width: `${stats?.total ? (stats.todo / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
              <span>To Do: {stats?.todo || 0}</span>
            </div>
            <div className="status-item">
              <div className="status-bar">
                <div 
                  className="status-fill in-progress"
                  style={{ width: `${stats?.total ? (stats.inProgress / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
              <span>In Progress: {stats?.inProgress || 0}</span>
            </div>
            <div className="status-item">
              <div className="status-bar">
                <div 
                  className="status-fill review"
                  style={{ width: `${stats?.total ? (stats.review / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
              <span>Review: {stats?.review || 0}</span>
            </div>
            <div className="status-item">
              <div className="status-bar">
                <div 
                  className="status-fill done"
                  style={{ width: `${stats?.total ? (stats.done / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
              <span>Done: {stats?.done || 0}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <a href="/projects" className="action-card">
              <FiFolder />
              <span>Manage Projects</span>
            </a>
            <a href="/tasks" className="action-card">
              <FiCheckSquare />
              <span>View All Tasks</span>
            </a>
            {user?.role === 'admin' && (
              <a href="/users" className="action-card">
                <FiUsers />
                <span>Manage Users</span>
              </a>
            )}
          </div>
        </div>

        {stats?.highPriority > 0 && (
          <div className="dashboard-section alert">
            <h2>⚠️ High Priority Tasks</h2>
            <p>You have {stats.highPriority} high priority tasks that need attention.</p>
            <a href="/tasks?priority=high" className="alert-link">View High Priority Tasks</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;