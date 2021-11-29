import React, { useState, useEffect } from "react";
import axios from "axios";
import Features from "../Features";
import Details from "../Details";
import DealershipDetails from "../DealershipDetails"

const host = "http://localhost:8080";

function VehicleDetails() {
  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    getCurrentVehicle();
    console.log("vehicle", vehicle);
  }, []);

  const getCurrentVehicle = () => {
    axios
      .get(`${host}/inventory/3FMCR9B69MRA657151`)
      .then((response) => {
        setVehicle(response.data);
      })
      .catch((error) => console.log(error));
  };
  
  console.log(vehicle);
  return (
    <div>
      {Object.keys(vehicle).length !== 0 && (
        <div>
          <img src={"http://localhost:8080" + vehicle.images} alt="Images" />
          <p></p>
          <p>{vehicle.make}</p>
          <p>Adjusted price</p>
          <Features features={vehicle.features} />

          <Details details={vehicle.details}/>
          <DealershipDetails dealerId={vehicle.dealerId}/>
        </div>
      )}
    </div>
  );
}

export default VehicleDetails;
