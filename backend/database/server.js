const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/dbConn");

const app = express();
const PORT = process.env.PORT || 8000;

const cors = require('cors');

// Enable CORS for all routes

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,,POST',
}));



connectDB();

// Connect to MongoDB using Mongoose
// mongoose.connect(
//   "mongodb+srv://scq01:0qcVxttqs6L4uwXK@cluster0.edohvkl.mongodb.net/",
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to MongoDB");
//   }
// );

app.use(bodyParser.json());

// Use authentication routes
app.use("/", authRoutes);

// Use user routes
app.use("/", userRoutes);

// Start the server
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
