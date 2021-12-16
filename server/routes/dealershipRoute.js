const express = require("express");
const router = express.Router();
const Dealership = require("../models/dealership");
const Inventory = require("../models/inventories");


// return an array of dealership objects
router.get("/", (req, res) => {
  Dealership.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).send("Failed to fetch the inventory data.");
    });
});

// return the dealership and inventory details by dealership id
router.get("/:dealerId", async (req, res) => {
  const requestedID = req.params.dealerId;

  const foundDealership = await Dealership.findOne({ dealerId: requestedID });
  const foundInventory = await Inventory.find({ dealerId: requestedID });

  if (!foundInventory) {
    res.status(404).send("Inventory not found");
  }

  const DealershipResponse = { foundDealership, foundInventory };
  res.json(DealershipResponse);
});

// add new dealership

router.post("/", async (req, res) => {
  if (!req.body) {
    res.status(400).send("Error: missing dealership data!");
  }
  const { dealerId, dealerName, dealerAddress, dealerPhoneNumber, emailId } =
    req.body;

  const newDealership = {
    dealerId,
    dealerName,
    dealerAddress,
    dealerPhoneNumber,
    emailId,
  };

  const NewDealership = await new Dealership(newDealership);
  NewDealership.save()
    .then(() => {
      res.status(201).send("New dealership added");
    })

    .catch(() => {
      res.status(500).send("New dealership failed to add!");
    });
});

// edit dealership data
router.put("/:dealerId", async (req, res) => {
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

  try {
    const activeDealership = await Dealership.findOne({ dealerId: dealerId });

    if (!activeDealership) {
      res
        .status(404)
        .send(
          `Error: Dealership with dealership id:${dealerId} doesn't exist in database!`
        );
    }

    const updatedactiveDealership = {
      dealerId: Id,
      dealerName: dealerName,
      dealerAddress: dealerAddress,
      dealerPhoneNumber: dealerPhoneNumber,
      emailId: emailId,
    };
    console.log("activeDealership", updatedactiveDealership);

    await Dealership.updateOne(
      {
        dealerId: dealerId,
      },
      updatedactiveDealership,
      { upsert: true }
    );

    res.status(200).send({
      message: "Dealership data updated successfully",
      updatedData: updatedactiveDealership,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send("Error: data updation failed!");
  }
});

module.exports = router;
