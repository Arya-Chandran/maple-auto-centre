const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// read and parse inventory data file
const inventoryDataFile = path.join(__dirname, "../data/inventories.json");
const inventoryData = fs.readFileSync(inventoryDataFile);
const parseInventoryData = JSON.parse(inventoryData);

//function to read the inventory data
const getInventory = () => {
  return JSON.parse(fs.readFileSync("./data/inventories.json", "UTF-8"));
};

// return an array of inventory objects
router.get("/", (req, res) => {
  res.json(getInventory());
});

// return the vehicle details by vin number
router.get("/:vin", (req, res) => {
  const requestedVIN = req.params.vin;
  const foundvehicle = parseInventoryData.find((vehicle) => {
    if (vehicle.vin === requestedVIN) {
      return vehicle.vin;
    }
  });
  res.json(foundvehicle);
});

module.exports = router;
