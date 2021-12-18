require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dealershipRoute = require("./routes/dealershipRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/users");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

// DB Connection

const mongoUsername = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const dbURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@mapleautocentre.eqepg.mongodb.net/maple-auto-centre?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to DB"))
  .catch((err) => console.log(err));

// Auth part
const adminUsers = ["admin@gmail.com"];

const authorize = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No token found" });
  }
  const authTokenArray = req.headers.authorization.split(" ");
  if (
    authTokenArray[0].toLowerCase() !== "bearer" &&
    authTokenArray.length !== 2
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  jwt.verify(authTokenArray[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "The token is expired or invalid" });
    }
    req.payload = decoded;
    next();
  });
};

// Routes
app.use("/dealership", dealershipRoute);
app.use("/inventory", inventoryRoute);

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, name, password, confirmPassword } = req.body;
  const newUser = { username, name, password, confirmPassword };
  const foundUser = await User.findOne({ username: username });
  const newPerson = new User(newUser);
  if (foundUser) {
    return res.status(400).json({
      message: "This user already exist. Please try new username!",
    });
  } else {
    await newPerson
      .save()
      .then(() => {
        res.status(201).send("New user added");
      })
      .catch(() => {
        res.status(500).send("Failed to add new user!");
      });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username: username });

  if (!foundUser) {
    return res
      .status(401)
      .json({ message: "This user doesn't exist. Please sign up!" });
  }

  if (foundUser.password === password) {
    const isAdmin = adminUsers.includes(username);
    // Generate a token and send it back
    const token = jwt.sign(
      {
        name: foundUser.name,
        username: foundUser.username,
        loginTime: Date.now(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );
    return res.status(200).json({ token, isAdmin });
  } else {
    return res.status(403).json({ message: "Invalid username or password" });
  }
});

app.get("/profile", authorize, (req, res) => {
  const { username } = req.payload;
  const isAdmin = adminUsers.includes(username);
  res.json({
    tokenInfo: req.payload,
    isAdmin,
  });
});

// Logout endpoint
app.get("/logout", authorize, (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No token found" });
  }
  const authTokenArray = req.headers.authorization.split(" ");
  if (
    authTokenArray[0].toLowerCase() !== "bearer" &&
    authTokenArray.length !== 2
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  jwt.destroy(authTokenArray[1], (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logout success" });
  });
});

app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});
