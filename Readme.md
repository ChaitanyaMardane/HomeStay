# HomeStay - Property Rental Platform

A full-stack web application for property rentals built with React and Node.js.

## Project Structure

```
HomeStay/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── Components/    # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── Context/      # React context providers
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   │
│   └── public/           # Static assets
│
└── server/               # Backend Node.js application
    ├── controllers/      # Route controllers
    ├── routes/          # API routes
    ├── middlewares/     # Express middlewares
    ├── prisma/          # Database schema and migrations
    └── utils/           # Utility functions
```

## Technologies Used

### Frontend
- React
- Vite
- TailwindCSS
- React Router DOM

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)

## Features Implemented

- 🏠 Property Listings Display
- 🎨 Responsive UI with TailwindCSS
- 🔒 Authentication System(JWT)
- 🗄️ PostgreSQL Database Integration
- 🔑 JWT-based Authorization
- 🌐 RESTful API Endpoints

## Environment Setup

### Backend Configuration
Node and  express to create server
use cors to handle cors  error  


### API Endpoints

#### Authentication
- `/api/auth` - Authentication routes

#### Listings
- `/api/listings` - Property listing routes

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Start the development servers:
   ```bash
   # Start frontend (from client directory)
   npm run dev

   # Start backend (from server directory)
   npm run dev
   ```

## Development Status

- ✅ Basic project structure
- ✅ Database setup with Prisma
- ✅ Authentication system
- ✅ Property listing components
- ✅ CORS configuration
- ✅ Review system (In Progress)
- 🚧 Apply Pagination
- 🚧 Filteration and Searching Funtionalities
