const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventories");

const uploadPath = "./public/images/";

// return an array of inventory objects
router.get("/", (req, res) => {
  Inventory.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).send("Failed to fetch the inventory data.");
    });
});

// return the vehicle details by vin number
router.get("/:vin", (req, res) => {
  const requestedVIN = req.params.vin;
  Inventory.findOne({ vin: requestedVIN })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res
        .status(500)
        .send(`Vehicle with VIN: ${requestedVIN} doesn't exist in database`);
    });
});

/* return an array of options for dropdown */
router.get("/dropdown/:property", async (req, res) => {
  const { property } = req.params;

  const inventoryData = await Inventory.find();

  const propertyOptions = inventoryData
    .map((vehicle) => {
      if (property === "dealership") {
        const { dealerId, dealerName } = vehicle;
        return { dealerId, dealerName };
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

  const imageFile = req.files.images;
  const imageName = imageFile.name;
  const newVehicle = {
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

  const newInventory = new Inventory(newVehicle);
  newInventory
    .save()
    .then(() => {
      imageFile.mv(uploadPath + imageFile.name, function (err) {
        if (err) {
          res.status(500).send("Image upload failed");
        } else {
          res.status(201).send("File uploaded");
        }
      });
    })
    .catch(() => {
      res.status(500).send("New inventory failed to add!");
    });
});

// edit vehicle details
router.put("/:vin", async (req, res) => {
  let imageFile;
  let imageName;
  const { vin } = req.params;

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

  if (
    !year ||
    !make ||
    !model ||
    !trim ||
    !dealerId ||
    !dealerName ||
    !price ||
    !features ||
    !engine ||
    !driveTrain ||
    !transmission ||
    !interior ||
    !exterior
  ) {
    res.status(404).send("Error: Invalid vehicle data!");
  }

  try {
    const activeVehicle = await Inventory.findOne({ vin: vin });

    if (!activeVehicle) {
      res
        .status(404)
        .send(
          `Error: Vehicle with vin number:${vin} doesn't exist in database!`
        );
    }

    if (req.files && Object.keys(req.files).length !== 0) {
      imageFile = req.files.images;
      imageName = imageFile.name;
    }

    let updatedVehicle = {
      year: year,
      vin: Vin,
      make: make,
      model: model,
      trim: trim,
      dealerName: dealerName,
      dealerId: dealerId,
      price: price,
      features: JSON.parse(features),
      details: {
        engine: engine,
        driveTrain: driveTrain,
        transmission: transmission,
        interior: interior,
        exterior: exterior,
      },
    };

    if (imageFile && imageName) {
      updatedVehicle = { ...updatedVehicle, images: [`/images/${imageName}`] };
    }

    await Inventory.updateOne(
      {
        vin: vin,
      },
      updatedVehicle,
      { upsert: true }
    );

    if (imageFile) {
      await imageFile.mv(uploadPath + imageFile.name);
    }
    res.status(201).send("Vehicle data updated successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send("Error: data updation failed!");
  }
});

//delete vehicle details
router.delete("/:vin", async (req, res) => {
  const requestedVIN = req.params.vin;
  await Inventory.deleteOne({ vin: requestedVIN })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(400).send(`Deletion Failed!`);
    });
});

module.exports = router;
