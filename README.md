# User Authentication & Profile Management System

This project is a  user authentication system that includes features such as OTP-based login and user profile management. It uses JWT for authentication and MySQL for storing user data.

## Features

- Send OTP to a mobile number (mock OTP).
- Verify OTP and return JWT access and refresh tokens.
- Create and manage user profiles (CRUD operations).
- Refresh token functionality to regenerate access tokens.

## Technologies Used

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

- Node.js (v12 or higher)
- MySQL (v5.7 or higher)
- npm (Node Package Manager)

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
2.Install Dependencies

Navigate to the project directory and install the required dependencies:
npm install

3.Create a MySQL Database

Create a MySQL database and note down the connection details (host, username, password, database name).
Execute the following SQL commands to create the necessary tables:
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mobile_number VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    company VARCHAR(100),
    city VARCHAR(50),
    access_token TEXT,
    refresh_token TEXT
);

CREATE TABLE otps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mobile_number VARCHAR(15) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

4.Create a .env File

Create a .env file in the root directory of the project and add the following environment variables:
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASS=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret

5.Run the Application

Start the server using the following command:
npm start

6.API Endpoints
API Endpoints
Send OTP

Endpoint: /api/send-otp
Method: POST
Request Body: { "country_code": "+1", "mobile_number": "1234567890" }
Response: Success or error message.
Verify OTP

Endpoint: /api/verify-otp
Method: POST
Request Body: { "mobile_number": "1234567890", "otp": "1234" }
Response: JWT tokens or error message.
Create User Profile

Endpoint: /api/profile
Method: POST
Request Body: { "name": "John Doe", "email": "john.doe@example.com", "company": "Example Corp", "city": "New York" }
Response: Success or unauthorized message.
Get User Profile

Endpoint: /api/profile
Method: GET
Response: User profile details or unauthorized message.
Refresh Token

Endpoint: /api/refresh-token
Method: POST
Request Body: { "refresh_token": "your-refresh-token" }
Response: New access token or error message.


Project Structure:
/your-repo-name
│
├── /node_modules
├── /src
│   ├── app.js          # Main application file
│   ├── routes.js       # API routes
│   ├── controllers/    # Controllers for handling requests
│   ├── models/         # Database models
│   ├── middleware/      # Middleware functions
│   └── config.js       # Configuration settings
│
├── .env                # Environment variables
├── .gitignore          # Files to ignore in git
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
