# 🚀 Team Task Manager

A modern, full-stack web application for team collaboration and task management. Built with React, Node.js, Express, and MongoDB.

![Team Task Manager](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & Authorization
- **Secure User Registration & Login** with JWT tokens
- **Role-based Access Control** (Admin/Member roles)
- **Password Encryption** using bcrypt
- **Protected Routes** and middleware

### 📊 Project Management
- **Create & Manage Projects** with detailed information
- **Project Ownership** and member management
- **Project Dashboard** with overview statistics
- **Real-time Project Updates**

### ✅ Task Management
- **Create, Update, Delete Tasks** with full CRUD operations
- **Task Status Tracking** (To Do, In Progress, Completed)
- **Task Assignment** to team members
- **Priority Levels** and due dates
- **Task Filtering** and search functionality

### 👥 Team Collaboration
- **Multi-user Support** with role-based permissions
- **Team Member Management** 
- **Project Sharing** and collaboration
- **Activity Tracking** and notifications

### 🎨 Modern UI/UX
- **Responsive Design** for all devices
- **Modern Gradient Interface** with clean aesthetics
- **Interactive Components** with smooth animations
- **Intuitive Navigation** and user experience

## 🎯 Demo

### Live Application
- **Frontend**: [https://tranquil-luck-production-6a8e.up.railway.app/login]
- **Backend API**: [https://stellar-upliftment-production-4f29.up.railway.app]

### Test Credentials
```
Admin User:
Email: admin@example.com
Password: admin123

Member User:
Email: member@example.com
Password: member123
```

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Beautiful icon library
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Development server auto-restart
- **dotenv** - Environment variable management
- **Express Validator** - Input validation and sanitization

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/team-task-manager.git
cd team-task-manager
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your configuration
# MONGO_URI=mongodb://localhost:27017/taskmanager
# JWT_SECRET=your_super_secret_key
# JWT_EXPIRE=7d
# PORT=5000

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

### Database Setup
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGO_URI in backend/.env with Atlas connection string
```

## 📖 Usage

### Getting Started
1. **Register** a new account or login with existing credentials
2. **Create Projects** to organize your team's work
3. **Add Team Members** to collaborate on projects
4. **Create Tasks** within projects and assign them to team members
5. **Track Progress** using the dashboard and task status updates

### User Roles

#### Admin
- Create and manage projects
- Add/remove team members
- Full access to all project features
- Manage user roles and permissions

#### Member
- View assigned projects and tasks
- Update task status and details
- Collaborate with team members
- Limited administrative access

### Key Workflows

#### Project Creation
1. Navigate to Projects page
2. Click "Create New Project"
3. Fill in project details (name, description)
4. Add team members
5. Start creating tasks

#### Task Management
1. Select a project
2. Click "Add Task"
3. Set task details (title, description, priority, assignee)
4. Track progress through status updates
5. Mark as completed when done

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register - Register new user
POST /api/auth/login    - User login
GET  /api/auth/me       - Get current user
```

### Project Endpoints
```
GET    /api/projects     - Get all projects
POST   /api/projects     - Create new project
GET    /api/projects/:id - Get project by ID
PUT    /api/projects/:id - Update project
DELETE /api/projects/:id - Delete project
```

### Task Endpoints
```
GET    /api/tasks              - Get all tasks
POST   /api/tasks              - Create new task
GET    /api/tasks/:id          - Get task by ID
PUT    /api/tasks/:id          - Update task
DELETE /api/tasks/:id          - Delete task
GET    /api/tasks/project/:id  - Get tasks by project
```

### Request/Response Examples

#### User Registration
```javascript
// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member"
}

// Response
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

## 📁 Project Structure

```
team-task-manager/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── projectController.js # Project management
│   │   └── taskController.js  # Task management
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication
│   │   └── roleCheck.js      # Role-based access
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Project.js        # Project schema
│   │   └── Task.js           # Task schema
│   ├── routes/
│   │   ├── auth.js           # Auth routes
│   │   ├── projects.js       # Project routes
│   │   └── tasks.js          # Task routes
│   ├── .env                  # Environment variables
│   ├── package.json          # Dependencies
│   └── server.js             # Express server
├── frontend/
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js      # API configuration
│   │   ├── components/
│   │   │   └── Navbar.js     # Navigation component
│   │   ├── context/
│   │   │   └── AuthContext.js # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.js      # Login page
│   │   │   ├── Signup.js     # Registration page
│   │   │   ├── Dashboard.js  # Dashboard page
│   │   │   ├── Projects.js   # Projects page
│   │   │   └── Tasks.js      # Tasks page
│   │   ├── App.js            # Main app component
│   │   └── index.js          # React entry point
│   ├── .env                  # Environment variables
│   └── package.json          # Dependencies
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # This file
```

## 🌐 Deployment

### Quick Deploy (Recommended)

#### Database (MongoDB Atlas)
1. Create free account at [MongoDB Atlas](https://mongodb.com/atlas)
2. Create cluster and get connection string
3. Update backend `.env` with connection string

#### Backend (Railway)
1. Push code to GitHub
2. Connect [Railway](https://railway.app) to your repository
3. Set root directory to `backend`
4. Add environment variables
5. Deploy automatically

#### Frontend (Vercel)
1. Connect [Vercel](https://vercel.com) to your repository
2. Set root directory to `frontend`
3. Add `REACT_APP_API_URL` environment variable
4. Deploy automatically

### Detailed Instructions
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

## 🐛 Bug Reports & Feature Requests

- **Bug Reports**: [Create an issue](https://github.com/Haris/team-task-manager/issues)
- **Feature Requests**: [Start a discussion](https://github.com/Haris/team-task-manager/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Haris Ali**
- GitHub: [Haris2707](https://github.com/Haris2707)
- LinkedIn: [Haris Ali](https://linkedin.com/in/haris-ali-3b4316251/)
- Email: 2k22.cse.2212475@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the flexible database
- Railway and Vercel for free hosting
- All contributors and users of this project

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/team-task-manager)
![GitHub forks](https://img.shields.io/github/forks/yourusername/team-task-manager)
![GitHub issues](https://img.shields.io/github/issues/yourusername/team-task-manager)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/team-task-manager)

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by [Haris Ali]
