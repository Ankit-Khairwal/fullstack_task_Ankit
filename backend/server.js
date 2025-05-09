const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB setup - using local MongoDB
const mongoUri = "mongodb://localhost:27017";
const dbName = "noteapp"; 
const collectionName = "notes";
const mongoClient = new MongoClient(mongoUri);

// Connect to MongoDB
(async () => {
  try {
    await mongoClient.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

// HTTP endpoints
app.post("/addTask", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne({ task, createdAt: new Date() });

    res.json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/fetchAllTasks", async (req, res) => {
  try {
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);
    const tasks = await collection.find({}).sort({ createdAt: -1 }).toArray();

    res.json({ tasks: tasks.map((item) => item.task) });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
