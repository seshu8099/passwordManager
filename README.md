<img width="1920" height="1026" alt="image" src="https://github.com/user-attachments/assets/6edf6190-2912-483c-ac35-1f7960d30634" />

<img width="1917" height="1039" alt="image" src="https://github.com/user-attachments/assets/cb4f268c-5520-44f1-8816-ad85b5dbd81b" />


# Secure MERN Stack Password Manager

## Project Overview

This project is a secure full-stack password manager application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides users with a safe and intuitive platform to store, manage, and retrieve their sensitive login credentials. Emphasizing security, the application incorporates industry-standard encryption techniques and best practices for user authentication and data protection.

## Features

-   **Secure User Authentication:** Implemented with JSON Web Tokens (JWT) and `bcrypt.js` for password hashing, ensuring secure user registration and login.
-   **AES-256 Encryption :** All user passwords are encrypted using AES-256-CBC with Node.js's built-in `crypto` module before being stored in the database, providing a high level of data security.
-   **CRUD Operations :** Users can seamlessly Create, Read, Update, and Delete their stored passwords.
-   **User-Specific Data Management :** Each user has a private and isolated vault, ensuring only they can access their stored credentials.
-   **Robust Password Strength Validation :** Frontend utility to guide users in creating strong, complex passwords.
-   **Password Breach check :** Utilizes the "Have I Been Pwned" API to check if a user's password has appeared in known data breaches, adding an extra layer of security awareness.
-   **Modern & Responsive UI :** Developed with React.js, styled using Tailwind CSS, and enhanced with Material UI components for a clean, intuitive, and mobile-friendly user experience.

## Tech Stack

This project demonstrates proficiency across the entire MERN stack:

**Frontend:**
*   **React.js:** A declarative, component-based JavaScript library for building dynamic user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Material UI:** A comprehensive suite of React UI tools for faster and easier web development.
*   **Axios:** Promise-based HTTP client for making API requests.
*   **React Router DOM:** For declarative routing within the application.
*   **`react-hot-toast`:** For elegant and responsive notifications.

**Backend:**
*   **Node.js:** A JavaScript runtime for building scalable server-side applications.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
*   **`jsonwebtoken`:** For implementing JWT-based authentication.
*   **`bcrypt.js`:** For hashing and salting user passwords securely.
*   **Node.js `crypto` module:** Utilized for AES-256 encryption and decryption of sensitive password data.
*   **`cors`:** Middleware to enable Cross-Origin Resource Sharing.
*   **`dotenv`:** For managing environment variables securely.

**Database:**
*   **MongoDB Atlas:** A cloud-hosted NoSQL database for flexible and scalable data storage.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
*   **Node.js** (v14 or higher) & **npm**
*   **Git**
*   A **MongoDB Atlas** account (or a local MongoDB instance)

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/MERN-Password-Manager.git
    cd MERN-Password-Manager
    ```
    *(Remember to replace `yourusername` with your actual GitHub username)*

2.  **Install Backend Dependencies:**
    Navigate to the `Backend` directory and install the required packages.
    ```bash
    cd Backend
    npm install
    ```

3.  **Configure Backend Environment Variables:**
    Create a `.env` file in the `Backend` directory and add the following:
    ```env
    PORT=8000
    MONGO_URL=your_mongodb_atlas_connection_string
    JWT_SECRET=a_very_strong_secret_key_for_jwt
    ENCRYPTION_KEY=a_32_byte_hex_key_for_aes_encryption
    ENCRYPTION_IV=a_16_byte_hex_iv_for_aes_encryption
    # You can generate ENCRYPTION_KEY and ENCRYPTION_IV using the generate-keys.js script
    # node generate-keys.js
    ```
    *Replace placeholders with your actual values. Ensure `ENCRYPTION_KEY` and `ENCRYPTION_IV` are securely generated.*

4.  **Install Frontend Dependencies:**
    Navigate to the `Frontend` directory and install the required packages.
    ```bash
    cd ../Frontend
    npm install
    ```

5.  **Configure Frontend Environment Variables:**
    Create a `.env` file in the `Frontend` directory and add the following:
    ```env
    VITE_API_URL=http://localhost:8000
    ```
    *This should match the `PORT` you set in your Backend's `.env` file.*

### Running the Application

1.  **Start the Backend Server:**
    From the `Backend` directory:
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:8000`.

2.  **Start the Frontend Development Server:**
    From the `Frontend` directory:
    ```bash
    npm run dev
    ```
    The frontend application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).



### User Routes (`/pwm/api/user`)
*   `POST /signup`: Register a new user.
*   `POST /login`: Authenticate a user and issue a JWT.
*   `POST /logout`: Invalidate user session (clears refresh token).

### Password Routes (`/pwm/api/password`)
*   `GET /`: Retrieve all passwords for the authenticated user.
*   `POST /`: Create a new password entry.
*   `PUT /:id`: Update an existing password entry by ID.
*   `DELETE /:id`: Delete a password entry by ID.



