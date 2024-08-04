const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require("cors"); // Import the CORS middleware
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));

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

app.post('/set-session', (req, res) => {
    const studentId = req.body.studentId;
    req.session.studentId = studentId; // Save data to session
    res.json({ message: 'Session data set', studentId: req.session.studentId });
  });

  app.get('/get-session', (req, res) => {
    const studentId = req.session.studentId; // Retrieve data from session
    if (studentId) {
      res.json({ studentId });
    } else {
      res.json({ message: 'No session data found' });
    }
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

