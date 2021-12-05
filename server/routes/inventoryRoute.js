const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// read and parse inventory data file
const inventoryDataFile = path.join(__dirname, "../data/inventories.json");
const inventoryData = fs.readFileSync(inventoryDataFile);
const parseInventoryData = JSON.parse(inventoryData);
const uploadPath = "./public/images/";

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

 /* return an array of options for dropdown */
router.get("/dropdown/:property", (req, res) => {
  const { property } = req.params;

  const propertyOptions = parseInventoryData
      .map((vehicle) => {
          if (property === "dealership") {
              const { dealerId, dealerName } = vehicle;
              return {  dealerId, dealerName };
          }
          return vehicle[property];
      })
      .filter(
          (item, index, array) =>
              array.findIndex((t) => {
                  if (property === "dealership") {
                      return t.dealerId === item.dealerId;
                  }
                  return t === item;
              }) == index
      );

  res.json(propertyOptions);
}); 

// add new vehicle
router.post("/", (req, res) => {

  if (!req.body || !req.files || Object.keys(req.files).length === 0) {
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
    features,
    engine,
    driveTrain,
    transmission,
    interior,
    exterior,
  } = req.body;
  console.log("vehicle.req.body:", req.body);
  console.log("vehicle.req.files:", req.files);

  const imageFile = req.files.images;
  const imageName = imageFile.name;
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
    images: [`/images/${imageName}`],
    features: JSON.parse(features),
    details: {
      engine,
      driveTrain,
      transmission,
      interior,
      exterior,
    },
  };

  parseInventoryData.push(newVehicle);

  fs.writeFile(
    inventoryDataFile,
    JSON.stringify(parseInventoryData),
    (error) => {
      if (error) {
        res.status(500).send("New inventory failed to add!");
      }
      imageFile.mv(uploadPath + imageFile.name, function (err) {
        if (err) {
          res.status(500).send("Image upload failed");
        } else {
          res.status(201).send("File uploaded");
        }  
      });
    });
});

// edit vehicle details
router.put("/:vin", (req, res) => {
  const { vin } = req.params;
  console.log("vin:", req.params.vin);
  const {
    vin: Vin,
    year,
    make,
    model,
    trim,
    dealerId,
    dealerName,
    price,
    images,
    features,
    engine,
    driveTrain,
    transmission,
    interior,
    exterior,
  } = req.body;
  console.log("vehicle.req.body:", req.body);
  console.log("vehicle.req.files:", req.body);

  if (
    !year ||
    !make ||
    !model ||
    !trim ||
    !dealerId ||
    !dealerName ||
    !price ||
    !images ||
    !features ||
    !engine ||
    !driveTrain ||
    !transmission ||
    !interior ||
    !exterior
  ) {
    res.status(404).send("Error: Invalid vehicle data!");
  }

  const activeVehicle = parseInventoryData.find(
    (vehicle) => vehicle.vin === vin
  );

  console.log("active:", activeVehicle);

  if (!activeVehicle) {
    res
      .status(404)
      .send(`Error: Vehicle with vin number:${vin} doesn't exist in database!`);
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
    activeVehicle.features = JSON.parse(features);
    activeVehicle.details.engine = engine;
    activeVehicle.details.driveTrain = driveTrain;
    activeVehicle.details.transmission = transmission;
    activeVehicle.details.interior = interior;
    activeVehicle.details.exterior = exterior;
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


router.delete("/:vin", (req, res) => {
  const requestedVIN = req.params.vin;
  const foundvehicle = parseInventoryData.findIndex((vehicle) => {
    if (vehicle.vin === requestedVIN) {
      return vehicle.vin;
    }
  });
  console.log("foundvehicle", foundvehicle)
  parseInventoryData.splice(foundvehicle, 1);
  fs.writeFile(
      inventoryDataFile,
      JSON.stringify(parseInventoryData),
      (err) => {
          if (err) {
              console.log(err);
          }
      }
  );
  res.json(parseInventoryData);
});




module.exports = router;
