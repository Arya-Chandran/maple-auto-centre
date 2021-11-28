const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");



// read and parse dealership data file

const dealershipDataFile = path.join(__dirname, "../data/dealerships.json");
const dealershipData = fs.readFileSync(dealershipDataFile);
const parseDealershipData = JSON.parse(dealershipData);

const getDealerships = () => {
    return JSON.parse(fs.readFileSync("./data/dealerships.json", "UTF-8"));
};


// return an array of dealership objects 

router.get("/", (req, res) => {
    res.json(getDealerships());
});


module.exports = router;
