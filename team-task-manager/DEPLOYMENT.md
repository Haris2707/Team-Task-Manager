# Team Task Manager - Deployment Guide

## Prerequisites
- [ ] GitHub account
- [ ] MongoDB Atlas account (free)
- [ ] Railway account (free)
- [ ] Vercel account (free)

## Step 1: Database Setup
1. [ ] Create MongoDB Atlas cluster
2. [ ] Get connection string
3. [ ] Update backend/.env with MongoDB URI

## Step 2: Backend Deployment (Railway)
1. [ ] Push code to GitHub
2. [ ] Connect Railway to GitHub repo
3. [ ] Set root directory to `backend`
4. [ ] Add environment variables:
   - [ ] MONGO_URI
   - [ ] JWT_SECRET
   - [ ] JWT_EXPIRE
   - [ ] PORT
5. [ ] Deploy and get backend URL

## Step 3: Frontend Deployment (Vercel)
1. [ ] Update frontend/.env with backend URL
2. [ ] Connect Vercel to GitHub repo
3. [ ] Set root directory to `frontend`
4. [ ] Add environment variable: REACT_APP_API_URL
5. [ ] Deploy and get frontend URL

## Step 4: Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test project creation
- [ ] Test task management
- [ ] Test role-based access

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

## Deployment URLs
- Backend: https://your-backend-url.railway.app
- Frontend: https://your-frontend-url.vercel.app
- Database: MongoDB Atlas cluster

## Troubleshooting
1. Check environment variables are set correctly
2. Ensure CORS is configured for your frontend domain
3. Verify MongoDB connection string format
4. Check build logs for errors