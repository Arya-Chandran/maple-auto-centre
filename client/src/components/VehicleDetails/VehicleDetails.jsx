import React, { useState, useEffect } from "react";
import axios from "axios";
import Features from "../Features";
import Details from "../Details";
import DealershipDetails from "../DealershipDetails"

const host = "http://localhost:8080";

function VehicleDetails(props) {
  const [vehicle, setVehicle] = useState({});
  
  useEffect(() => {
    console.log(props)
    const {vin} = props.match.params;
    getCurrentVehicle(vin);
    console.log("vehicle", vehicle);
  }, []);

  const getCurrentVehicle = (vin) => {
    axios
      .get(`${host}/inventory/${vin}`)
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
          <img src={`${host}/${vehicle.images[0]}`} alt="Images" />
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
