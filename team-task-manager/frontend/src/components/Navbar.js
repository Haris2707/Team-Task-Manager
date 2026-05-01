import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiFolderPlus, FiCheckSquare, FiLogOut, FiUser } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FiCheckSquare className="brand-icon" />
        <h2>TaskManager</h2>
      </div>
      
      <div className="navbar-links">
        <Link 
          to="/dashboard" 
          className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <FiHome />
          <span>Dashboard</span>
        </Link>
        <Link 
          to="/projects" 
          className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
        >
          <FiFolderPlus />
          <span>Projects</span>
        </Link>
        <Link 
          to="/tasks" 
          className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}
        >
          <FiCheckSquare />
          <span>Tasks</span>
        </Link>
      </div>

      <div className="navbar-user">
        <div className="user-info">
          <FiUser className="user-icon" />
          <div className="user-details">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        <button onClick={logout} className="logout-btn">
          <FiLogOut />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;