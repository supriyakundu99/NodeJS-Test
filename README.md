# NodeJS-Test

A versatile NodeJS project that can be used as both REST API and MVC application. This project demonstrates best practices for building scalable Node.js applications with a clean architecture.

## Features
- Supports both API and MVC architectures
- Built with NodeJS and Express
- Easy to configure and extend

## Technology Stack
- Node.js & Express.js
- MongoDB for database
- Express-validator for input validation
- JWT for authentication
- Morgan for logging
- Swagger for API documentation

## Project Structure
```
├── config/         # Configuration files
├── controllers/    # Request handlers
├── models/        # Database models
├── routes/        # Application routes
├── middlewares/   # Custom middleware
├── utils/         # Utility functions
├── views/         # MVC view templates
└── tests/         # Test files
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Copy `.env.example` to `.env` and update the values
3. Run `npm install`
4. Set up MongoDB database
5. Run `npm start` for production or `npm run dev` for development

## Usage
The project runs on: http://localhost:8000/

### API Documentation
Access Swagger documentation at: http://localhost:8000/api-docs

### API Endpoints
- Authentication
  - POST `/api/auth/register` - Register new user
  - POST `/api/auth/login` - User login
- Users
  - GET `/api/users` - Get all users
  - GET `/api/users/:id` - Get user by ID
- Other endpoints coming soon...

### MVC Routes
- GET `/` - Home page
- GET `/dashboard` - User dashboard
- GET `/profile` - User profile

## Development
- Run tests: `npm test`
- Lint code: `npm run lint`
- Format code: `npm run format`

## Contributing
Feel free to submit issues and pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
