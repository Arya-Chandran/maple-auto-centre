const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");



// read and parse inventory data file 

const inventoryDataFile = path.join(__dirname, "../data/inventories.json");
const inventoryData = fs.readFileSync(inventoryDataFile);
const parseInventoryData = JSON.parse(inventoryData);

const getInventory = () => {
    return JSON.parse(fs.readFileSync("./data/inventories.json", "UTF-8"));
};

// return an array of inventory objects

router.get("/", (req, res) => {
    res.json(getInventory());
});

  
  module.exports = router;