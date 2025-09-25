<img width="1911" height="939" alt="image" src="https://github.com/user-attachments/assets/8eb927af-b446-4275-818f-55bd34492269" />
<img width="1878" height="864" alt="image" src="https://github.com/user-attachments/assets/75059118-b5fe-4021-96c2-d2fd5113a2e3" />


# Password Manager Web Application

A secure MERN stack password manager application that helps users store and manage their passwords safely.

## Features

- 🔐 Secure user authentication
- ✨ Create, read, update and delete passwords
- 🔒 Encrypted password storage
- 👤 User-specific password management
- 🎨 Modern and responsive UI

## Tech Stack

- MongoDB - Database
- Express.js - Backend framework
- React.js - Frontend framework
- Node.js - Runtime environment
- Tailwind CSS - Styling
- Material UI - UI components

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB Atlas account
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/MERN-Password-Manager.git
cd MERN-Password-Manager
```

2. Install Backend Dependencies
```bash
cd Backend
npm install
```

3. Configure Environment Variables
Create a `.env` file in the Backend directory:
```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Install Frontend Dependencies
```bash
cd ../Frontend
npm install
```

5. Start the Application

Backend:
```bash
cd Backend
npm start
```

Frontend:
```bash
cd Frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### User Routes
- POST `/pwm/api/user/signup` - Register new user
- POST `/pwm/api/user/login` - Login user

### Password Routes
- GET `/pwm/api/password` - Get all passwords
- POST `/pwm/api/password` - Create new password
- PUT `/pwm/api/password/:id` - Update password
- DELETE `/pwm/api/password/:id` - Delete password


