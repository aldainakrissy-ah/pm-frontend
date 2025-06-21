# Project Management Frontend

This is a simple React application for managing project tasks. It provides a user interface to create and view tasks for a project, with integration to a backend API. The app uses Material-UI for styling and layout.

## Overview

This project allows users to:
- **Create new tasks** with details such as name, assignee, priority, and due date.
- **View a list of tasks** in a table, sorted by priority.
- **Interact with a backend API** for persistent data storage.

The frontend is built with React and Material-UI, and communicates with a backend server at `http://localhost:8080/api`.

## Project Structure

```
my-react-app
├── public
│   └── index.html
├── src
│   ├── App.js
│   ├── index.js
│   ├── api
│   │   └── api.js
│   ├── components
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
├── package.json
└── README.md
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-react-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

   This will start the development server and open the application in your default web browser at [http://localhost:3000](http://localhost:3000).

## Features

- **Task Creation:** Add new tasks with name, assignee, priority, and due date using [`TaskForm`](src/components/TaskForm.jsx).
- **Task Listing:** View tasks in a sortable table using [`TaskList`](src/components/TaskList.jsx).
- **API Integration:** All data is fetched and saved via the backend API using functions in [`api.js`](src/api/api.js).
- **Material-UI Styling:** Uses Material-UI components for a modern look and feel.
- **Custom Styles:** Additional CSS in [`App.css`](src/styles/App.css).

## API Endpoints

- `POST /projects/:projectId/tasks` — Create a new task.
- `GET /projects/:projectId/tasks` — Retrieve a list of tasks (supports filtering and sorting).

## License

This project is licensed under the MIT License.