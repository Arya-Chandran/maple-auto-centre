const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// read and parse dealership data file
const dealershipDataFile = path.join(__dirname, "../data/dealerships.json");
const dealershipData = fs.readFileSync(dealershipDataFile);
const parseDealershipData = JSON.parse(dealershipData);

// read and parse inventory data file
const inventoryDataFile = path.join(__dirname, "../data/inventories.json");
const inventoryData = fs.readFileSync(inventoryDataFile);
const parseInventoryData = JSON.parse(inventoryData);

//function to read the dealership data
const getDealerships = () => {
  return JSON.parse(fs.readFileSync("./data/dealerships.json", "UTF-8"));
};

//function to read the inventory data
const getInventory = () => {
  return JSON.parse(fs.readFileSync("./data/inventories.json", "UTF-8"));
};

// return an array of dealership objects
router.get("/", (req, res) => {
  res.json(getDealerships());
});

// return the dealership and inventory details by dealership id
router.get("/:dealerId", (req, res) => {
  const requestedID = req.params.dealerId;
  const foundDealership = parseDealershipData.find((dealership) => {
    if (dealership.dealerId === requestedID) {
      return dealership.dealerId;
    }
  });

  const inventoryData = getInventory();
  const foundInventory = inventoryData.filter((inventory) => {
    if (inventory.dealerId === requestedID) {
      return inventory.dealerId;
    }
  });
  if (!foundInventory) {
    res.status(404).send("Inventory not found");
  }

  const DealershipResponse = { foundDealership, foundInventory };
  res.json(DealershipResponse);
});

module.exports = router;
