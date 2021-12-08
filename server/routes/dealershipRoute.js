const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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

// add new dealership
router.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).send("Error: missing dealership data!");
  }
  const { dealerId, dealerName, dealerAddress, dealerPhoneNumber, emailId } =
    req.body;

  const newDealership = {
    id: uuidv4(),
    dealerId,
    dealerName,
    dealerAddress,
    dealerPhoneNumber,
    emailId,
  };
  parseDealershipData.push(newDealership);
  fs.writeFileSync(
    dealershipDataFile,
    JSON.stringify(parseDealershipData),
    (error) => {
      if (error) {
        return;
      }
    }
  );
  res.status(201).json(newDealership);
});

// edit dealership data
router.put("/:dealerId", (req, res) => {
  const { dealerId } = req.params;
  const {
    dealerId: Id,
    dealerName,
    dealerAddress,
    dealerPhoneNumber,
    emailId,
  } = req.body;

  if (!dealerName || !dealerAddress || !dealerPhoneNumber || !emailId) {
    res.status(404).send("Error: Invalid dealership data!");
  }

  const activeDealership = parseDealershipData.find(
    (dealership) => dealership.dealerId === dealerId
  );

  if (!activeDealership) {
    res
      .status(404)
      .send(
        `Error: Dealership with dealership id:${dealerId} doesn't exist in database!`
      );
  }

  if (activeDealership) {
    activeDealership.dealerId = Id;
    activeDealership.dealerName = dealerName;
    activeDealership.dealerAddress = dealerAddress;
    activeDealership.dealerPhoneNumber = dealerPhoneNumber;
    activeDealership.emailId = emailId;
  }

  const updatedactiveDealership = parseDealershipData.map((dealership) => {
    if (dealership.Id === dealerId) {
      dealership = activeDealership;
    }
    return dealership;
  });

  fs.writeFile(
    dealershipDataFile,
    JSON.stringify(updatedactiveDealership),
    (error) => {
      if (error) {
        res.status(404).send("Error: data updation failed!");
        return;
      }
      res.status(200).send({
        message: "Dealership data updated successfully",
        updatedData: activeDealership,
      });
    }
  );
});

module.exports = router;
