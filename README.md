# My Daily Tasks

A clean, modern task management app built with **React** and **Node.js/Express**. Tasks persist in the browser via **LocalStorage** and can be synced to a **MongoDB** database with one click.

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React 19, Tailwind CSS v4, Vite     |
| Backend    | Node.js, Express 5                  |
| Database   | MongoDB (Mongoose 9)                |

## Features

- **Add, complete, and delete tasks** with a clean dark UI
- **LocalStorage persistence** — tasks survive page refreshes
- **Backend sync** — save your tasks to MongoDB with one click
- **Filter by status** — All / Active / Completed
- **Progress bar** — visual indicator of completion
- **Server-side loading** — tasks are fetched from the database on app load
- **Centralized error handling** on the backend
- **Input validation** on both client and server
- **Toast notifications** with visual type differentiation (success/error)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB running locally on `mongodb://localhost:27017`

### Backend Setup

```bash
cd backend
cp .env.example .env     # configure your environment
npm install
npm run dev              # starts on http://localhost:8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev              # starts on http://localhost:5173
```

### Environment Variables

See `backend/.env.example` for all available options:

| Variable       | Default                                      | Description                  |
| -------------- | -------------------------------------------- | ---------------------------- |
| `PORT`         | `8000`                                       | Backend server port          |
| `MONGODB_URI`  | `mongodb://localhost:27017/daily-task-app`    | MongoDB connection string    |
| `NODE_ENV`     | `development`                                | Environment mode             |
| `FRONTEND_URL` | `http://localhost:5173`                       | Allowed CORS origin          |

## API Endpoints

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/tasks`     | Fetch all saved tasks    |
| POST   | `/api/tasks`     | Save/sync all tasks      |
| GET    | `/api/health`    | Server health check      |

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/db.js            # MongoDB connection
│   │   ├── controllers/taskController.js
│   │   ├── middleware/errorHandler.js
│   │   ├── models/Task.js
│   │   ├── routes/taskRoutes.js
│   │   └── server.js               # Express entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskInput.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── SyncButton.jsx
│   │   ├── App.jsx                 # Main app with state management
│   │   ├── index.css               # Tailwind theme + custom styles
│   │   └── main.jsx
│   └── package.json
└── README.md
```
