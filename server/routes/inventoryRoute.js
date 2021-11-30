const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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

// add new vehicle
router.post("/add", (req, res) => {
  if (!req.body) {
    res.status(400).send("Error: missing vehicle data!");
  }
  const {
    year,
    make,
    model,
    trim,
    vin,
    dealerId,
    dealerName,
    price,
    images,
    features,
    details,
  } = req.body;
  console.log(req.body);
  const newVehicle = {
    id: uuidv4(),
    year,
    make,
    model,
    trim,
    vin,
    dealerId,
    dealerName,
    price,
    images,
    features,
    details,
  };
  parseInventoryData.push(newVehicle);
  fs.writeFileSync(
    inventoryDataFile,
    JSON.stringify(parseInventoryData),
    (error) => {
      if (error) {
        return;
      }
    }
  );
  res.status(201).json(newVehicle);
});

// edit vehicle details
router.put("/:vin", (req, res) => {
  const { vin } = req.params;
  console.log("vin:", req.params.vin);
  const { vin:Vin,
    year,
    make,
    model,
    trim,
    dealerId,
    dealerName,
    price,
    images,
    features,
    details,
  } = req.body;
  console.log("vehicle.req.body:", req.body);

  if (!year || !make || !model || !trim || !dealerId || !dealerName || !price || !images || !features || !details ) {
    res.status(404).send("Error: Invalid vehicle data!");
  }

  const activeVehicle = parseInventoryData.find(
    (vehicle) => vehicle.vin === vin
  );

  console.log("active:", activeVehicle);

  if (!activeVehicle) {
    res
      .status(404)
      .send(
        `Error: Vehicle with vin number:${vin} doesn't exist in database!`
      );
  }

  if (activeVehicle) {
    activeVehicle.vin = Vin;
    activeVehicle.make = make;
    activeVehicle.model = model;
    activeVehicle.trim = trim;
    activeVehicle.dealerName = dealerName;
    activeVehicle.dealerId = dealerId;
    activeVehicle.price = price;
    activeVehicle.images = images;
    activeVehicle.features = features;
    activeVehicle.details.engine = details.engine;
    activeVehicle.details.driveTrain = details.driveTrain;
    activeVehicle.details.transmission = details.transmission;
    activeVehicle.details.interior = details.interior;
    activeVehicle.details.exterior = details.exterior;
  }
  console.log("active2:", activeVehicle);

  const updatedactiveVehicle = parseInventoryData.map((vehicle) => {
    if (vehicle.vin === vin) {
      vehicle = activeVehicle;
    }
    return vehicle;
  });

  fs.writeFile(
    inventoryDataFile,
    JSON.stringify(updatedactiveVehicle),
    (error) => {
      if (error) {
        res.status(404).send("Error: data updation failed!");
        return;
      }
      res.status(200).send({
        message: "Vehicle data updated successfully",
        updatedData: activeVehicle,
      });
    }
  );
});

module.exports = router;
