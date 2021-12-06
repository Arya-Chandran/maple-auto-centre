require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dealershipRoute = require("./routes/dealershipRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const contactDealerRoute = require("./routes/contactDealerRoute");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

// Auth part
const adminDataFile = path.join(__dirname, "./data/admin.json");
const adminData = fs.readFileSync(adminDataFile);
const users = JSON.parse(adminData);
const adminUsers = ["admin"];

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
app.use("/contactdealer", contactDealerRoute);

// register endpoint
app.post("/register", (req, res) => {
  const { username, name, password } = req.body;
  const newUser = { username, name, password };

  const foundUser = users.find((user) => user.username === newUser.username);
  if (foundUser) {
   return res.status(400).json({message:"This user already exist. Please try new username!"});
  } else {
    users.push(newUser);
    fs.writeFile(adminDataFile, JSON.stringify(users), (error) => {
      if (error) {
        res.status(500).send("Failed to add new user!");
      } else {
        res.status(201).send("New user added");
      }
    });
  }
});

// logout endpoint
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
      return res
        .status(401)
        .json({ message: "Logout failed" });
    }
    res.status(200).json({message: "Logout success"});
  });
});

// login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const foundUser = users.find((user) => user.username === username);

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
  res.json({
    tokenInfo: req.payload,
    sensitiveInformation: {
      secret: "secret message",
    },
  });
});

app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});
