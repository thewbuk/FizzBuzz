# FizzBuzz React Application

This application is a simple implementation of the FizzBuzz algorithm using React.js, Tailwind CSS and a backend server. It fetches data from a backend and provides user authentication using Flask and JWT.

# Getting Started

**Prerequisites:**

 1. Node.js
 2. Git
 3. Python (For running the backend server)
## 1. Clone the Repository

## 2. Navigate into the project directory
## 3. Install Dependencies
For the frontend, use:

    npm install

For the backend (assuming you have Python and pip installed) in the src directory run:

    pip install -r requirements.txt

# Running the application

In the src directory, run:

    python api.py



This will start the backend server at http://localhost:5000

In the project directory, you can run:

    npm start
   
  Open http://localhost:3000 to view the application in your browser.

# Security Considerations
**Broken Authentication**
The application uses JWT tokens for managing user sessions.
**Sensitive Data Exposure**
Although this application doesn't deal with sensitive data, the data is not encrypted.
**Cross-Site Scripting (XSS)**
React helps prevent XSS attacks by default as it escapes content, but some consideration should be given at a later stage
**Using Components with Known Vulnerabilities**
Keeping libraries up-to-date to prevent vulnerabilities from outdated libraries. 
**Logging & Monitoring**
The current application doesn't include any logging or monitoring, which should be implemented at a larger scale

