const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the CORS middleware
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("Server Running In Port 3000");
});

mongoose
  .connect(
    "mongodb+srv://Heshan655:6uVyUM7q9nIBO2OC@devetaminapi.62egjtv.mongodb.net/Zoom?retryWrites=true&w=majority&appName=DevetaminAPI",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Model
const Student = require("./models/StudentModel");

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/save", (req, res) => {
  res.send("save Page");
});

// Create New Product
app.post("/student/save", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(200).json(student);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Fetch All Products
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

