Your project documentation looks well-organized and informative! Here's a more refined version that clarifies some aspects, like additional details in the instructions and improved structure:

---

# User Authentication & Profile Management System

This project implements a user authentication system with OTP-based login and user profile management. It utilizes JWT for authentication and MySQL as the database for storing user information.

## Features

- Send OTP to a mobile number (mock OTP for demonstration).
- OTP verification and issuance of JWT access and refresh tokens.
- Manage user profiles (CRUD operations: Create, Read, Update, Delete).
- Refresh token mechanism to renew access tokens without re-login.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites

Ensure the following software is installed on your system:

- Node.js (v12 or higher)
- MySQL (v5.7 or higher)
- npm (Node Package Manager)

### Setup Instructions

1. **Clone the Repository**

   Run the following command to clone the repository:

   ```bash
   git clone (https://github.com/Sushant0124/NodeJS)
   cd your-repo-name
   ```

2. **Install Dependencies**

   Inside the project directory, install the required packages using npm:

   ```bash
   npm install
   ```

3. **Create a MySQL Database**

   Set up a new MySQL database and note down the connection details (host, username, password, and database name). Next, execute the following SQL commands to create the necessary tables:

   ```sql
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
   ```

4. **Create a `.env` File**

   In the root directory, create a `.env` file to store environment-specific variables. Add your MySQL connection details and JWT secret as shown below:

   ```bash
   DB_HOST=your_database_host
   DB_USER=your_database_username
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the Application**

   Start the server by running the following command:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000` by default.

### API Endpoints

1. **Send OTP**

   - **Endpoint**: `/api/send-otp`
   - **Method**: `POST`
   - **Request Body**: 
     ```json
     { "country_code": "+1", "mobile_number": "1234567890" }
     ```
   - **Response**: Success or error message.

2. **Verify OTP**

   - **Endpoint**: `/api/verify-otp`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     { "mobile_number": "1234567890", "otp": "1234" }
     ```
   - **Response**: JWT tokens or error message.

3. **Create User Profile**

   - **Endpoint**: `/api/profile`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     { "name": "John Doe", "email": "john.doe@example.com", "company": "Example Corp", "city": "New York" }
     ```
   - **Response**: Success or unauthorized message.

4. **Get User Profile**

   - **Endpoint**: `/api/profile`
   - **Method**: `GET`
   - **Response**: User profile details or unauthorized message.

5. **Refresh Token**

   - **Endpoint**: `/api/refresh-token`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     { "refresh_token": "your-refresh-token" }
     ```
   - **Response**: New access token or error message.

---

## Project Structure

```
/your-repo-name
│
├── /node_modules           # Dependencies
├── /src
│   ├── app.js              # Main application file
│   ├── routes.js           # API routes
│   ├── controllers/        # Controllers for handling requests
│   ├── models/             # Database models
│   ├── middleware/         # Middleware functions (authentication, etc.)
│   └── config.js           # Configuration settings (DB, JWT secret)
│
├── .env                    # Environment variables
├── .gitignore              # Files to ignore in git
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

### Additional Notes

- **Mock OTP**: In the current version, the OTP is mocked for demonstration purposes. In a real-world scenario, you'd use an SMS service (like Twilio or AWS SNS) to send OTPs.
- **JWT Expiration**: Ensure to set appropriate expiration times for the access and refresh tokens to enhance security.

