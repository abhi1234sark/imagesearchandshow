# Image Search & Show - MERN + OAuth Project

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring OAuth authentication and image search functionality using the Unsplash API.
![Alt text](https://github.com/abhi1234sark/imagesearchandshow/blob/35c4f940ba127aaf50f90e4f61fe79577f889f1e/imagesearchandshow1.png)
![Alt text](<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/01fce93e-0dc7-41af-a5aa-ccd2ff0fb2f0" />
)
## 🚀 Features

- **OAuth Authentication**: Login with Google, Facebook, and GitHub
- **Image Search**: Search millions of high-quality images from Unsplash
- **Multi-Select Interface**: Select multiple images with checkboxes
- **Search History**: Personal search history for each user
- **Top Searches**: Trending search terms across all users
- **Responsive Design**: Mobile-friendly interface
- **Real-time Stats**: Search statistics and analytics

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Passport.js** for OAuth authentication
- **Axios** for API calls
- **Helmet** for security
- **Express Rate Limit** for API protection

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Styled Components** for styling
- **React Icons** for icons
- **React Toastify** for notifications
- **Axios** for API communication

## 📁 Project Structure

```
image-search-and-show/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   └── ...
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Passport configuration
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd image-search-and-show
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Return to root
cd ..
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:

```bash
cp server/env.example server/.env
```

Edit `server/.env` with your actual values:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/image-search-app

# Server
PORT=5000
NODE_ENV=development

# Unsplash API
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here

GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# Session Secret
SESSION_SECRET=your_session_secret_here
```

### 4. Get API Keys

#### Unsplash API
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your Access Key

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:5000/api/auth/google/callback` to authorized redirect URIs

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Add `http://localhost:5000/api/auth/facebook/callback` to Valid OAuth Redirect URIs

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL to `http://localhost:5000/api/auth/github/callback`

### 5. Start the Application

```bash
# Start both client and server concurrently
npm run dev

# Or start them separately:

# Terminal 1 - Start server
npm run server

# Terminal 2 - Start client
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📚 API Endpoints

### Authentication
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/facebook` - Facebook OAuth login
- `GET /api/auth/github` - GitHub OAuth login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Search
- `POST /api/search` - Search images
  ```json
  {
    "term": "nature"
  }
  ```
- `GET /api/search/top-searches` - Get top 5 search terms

### History
- `GET /api/history` - Get user's search history
- `GET /api/history/stats` - Get user's search statistics

## 🧪 Testing with cURL

### Search Images
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=your_session_id" \
  -d '{"term": "mountains"}'
```

### Get Top Searches
```bash
curl http://localhost:5000/api/search/top-searches
```

### Get User History
```bash
curl -H "Cookie: connect.sid=your_session_id" \
  http://localhost:5000/api/history
```

## 🎨 Features Overview

### 1. Authentication Flow
- Users can login with Google, Facebook, or GitHub
- Session-based authentication with secure cookies
- Automatic user creation and profile management

### 2. Image Search
- Real-time search using Unsplash API
- 4-column responsive grid layout
- Image metadata display (author, likes, etc.)
- Hover effects and smooth animations

### 3. Multi-Select Functionality
- Checkbox overlay on each image
- Select all/deselect all options
- Real-time selection counter
- Download selected images (UI ready)

### 4. Search History
- Personal search history with timestamps
- Search statistics and analytics
- Click to re-search functionality
- Pagination support

### 5. Top Searches Banner
- Real-time trending searches
- Beautiful gradient banner design
- Search count display

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start both client and server
npm run server       # Start only server
npm run client       # Start only client

# Production
npm run build        # Build client for production
npm start           # Start production server

# Installation
npm run install-all # Install all dependencies
```

### Code Structure

- **Components**: Reusable React components with styled-components
- **Contexts**: React Context for state management
- **Routes**: Express.js API routes with middleware
- **Models**: Mongoose schemas for MongoDB
- **Config**: Passport.js OAuth strategies

## 🚀 Deployment

### Environment Variables for Production

Update the following in your production environment:

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
CORS_ORIGIN=your_production_frontend_url
```

### Build for Production

```bash
# Build the React app
npm run build

# The built files will be in client/build/
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file

2. **OAuth Redirect Errors**
   - Verify callback URLs in OAuth app settings
   - Check CORS configuration

3. **Unsplash API Errors**
   - Verify UNSPLASH_ACCESS_KEY
   - Check API rate limits

4. **Session Issues**
   - Ensure SESSION_SECRET is set
   - Check cookie settings

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Note**: This is a demonstration project for learning purposes. In production, ensure proper security measures, error handling, and performance optimizations.
