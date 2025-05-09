# Todo List Application

A full-stack todo list application built with React, Express, MQTT, Redis, and MongoDB.

## Features

- Add new tasks through MQTT or HTTP
- Store tasks in Redis cache
- Automatically move tasks to MongoDB when cache exceeds 50 items
- Responsive design with Tailwind CSS
- Real-time updates

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Redis instance
- MongoDB instance
- MQTT broker

## Setup

1. Clone the repository
2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_USERNAME=your_redis_username
REDIS_PASSWORD=your_redis_password
MONGODB_URI=your_mongodb_uri
MONGODB_DB=your_database_name
MONGODB_COLLECTION=your_collection_name
PORT=5000
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `POST /addTask` - Add a new task
- `GET /fetchAllTasks` - Get all tasks

## MQTT Topics

- `/add` - Subscribe to this topic to add new tasks

## Technologies Used

- Frontend:

  - React
  - Vite
  - Tailwind CSS
  - Axios
  - Heroicons

- Backend:
  - Express.js
  - MQTT
  - Redis
  - MongoDB
  - Node.js
