require('dotenv').config();
const {PORT} = process.env
const express = require("express");
const app = express();
const cors= require('cors');
const fileUpload = require('express-fileupload');
const dealershipRoute = require("./routes/dealershipRoute");
const inventoryRoute = require("./routes/inventoryRoute");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

app.use("/dealership", dealershipRoute);
app.use("/inventory", inventoryRoute);


app.listen(PORT, function () {
    console.log(`Listening on http://localhost:${PORT}`);
  });