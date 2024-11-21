# To-Do List App

## Description
A simple application where users can add, edit, delete, and mark tasks as complete.

## Tech Stack

### Frontend
- Framework: React.js

### Backend
- Node.js with Express.js

### Database
- JSON file 
- (Optional) Firebase 

### Deployment
- Frontend: GitHub Pages
- Backend: Heroku or Vercel

## Deployment Instructions

### Frontend Deployment to GitHub Pages
1. Install GitHub Pages dependency:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add these fields to your `package.json`:
   ```json
   {
     "homepage": "https://kf5131.github.io/TodoListApp",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. Deploy the app:
   ```bash
   npm run deploy
   ```

4. On GitHub, go to repository Settings > Pages:
   - Under "Build and deployment"
   - Source: Deploy from a branch
   - Branch: gh-pages / root
   - Click Save
   - Wait a few minutes for deployment to complete
   - You can check the deployment status in the "Actions" tab

## Why
This project covers the basics of CRUD operations, user interface design, and managing state.