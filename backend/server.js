// Load environment variables
require('dotenv').config();

const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Read from environment variables
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;

// Debug check for URI
if (!mongoUri) {
  console.error("❌ MONGODB_URI is undefined. Please check your .env file.");
  process.exit(1);
}

const mongoClient = new MongoClient(mongoUri);

// Connect to MongoDB
(async () => {
  try {
    await mongoClient.connect();
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit if MongoDB fails
  }
})();

// Routes
app.get("/head", (req, res) => {
  res.send("Welcome to the Note App API");
});

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
  console.log(`🚀 Server running on port ${port}`);
});
