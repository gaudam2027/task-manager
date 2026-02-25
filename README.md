# Task Manager App

A full-stack Task Management application built with the MERN stack (well, MEN + EJS) that allows users to securely manage their daily tasks.

## 🚀 Features

- **User Authentication**: Secure Sign-up, Sign-in, and Logout functionality using `bcrypt` for password hashing and `express-session` for session management.
- **Task CRUD**: Complete Create, Read, Update, and Delete operations for tasks.
- **Task Status tracking**: Mark tasks as "pending" or "completed".
- **Responsive UI**: Server-side rendered views using EJS with a focus on simplicity and usability.
- **Data Persistence**: Uses MongoDB to store user and task information reliably.
- **No Cache**: Middleware implemented to prevent sensitive pages from being cached.

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Templating Engine**: [EJS](https://ejs.co/)
- **Authentication**: [bcrypt](https://www.npmjs.com/package/bcrypt), [express-session](https://www.npmjs.com/package/express-session)
- **Development**: [Nodemon](https://nodemon.io/)

## 📂 Project Structure

```text
├── config/             # Database configuration
├── controllers/        # Business logic for tasks and users
├── middleware/         # Authentication and other middlewares
├── models/             # Mongoose schemas (Task, User)
├── public/             # Static assets (CSS, JS, Images)
├── routers/            # Route definitions
├── validators/         # Input validation logic
├── views/              # EJS templates
├── .env                # Environment variables
├── server.js           # Application entry point
└── package.json        # Dependencies and scripts
```

## ⚙️ Setup & Installation

Follow these steps to get the project running locally:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally

### 2. Clone the repository
```bash
git clone <repository-url>
cd task-manager
```

### 3. Install dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/taskmanager
SESSION_SECRET=your_secret_key_here
PORT=3000
```

### 5. Run the application

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The app will be available at `http://localhost:3000`.

## 📝 License

This project is licensed under the ISC License.
