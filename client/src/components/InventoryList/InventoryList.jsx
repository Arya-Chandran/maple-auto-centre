import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const host = "http://localhost:8080";

function InventoryList(props) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = () => {
    axios
      .get(`${host}/inventory`)
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {inventory &&
        inventory.map((vehicle) => (
          <div key={vehicle.vin}>
            <img src={`${host}/${vehicle.images[0]}`}  alt="Images" />
            <p>{vehicle.make}</p>
            <p>{vehicle.model}</p>
            <p>{vehicle.trim}</p>
            <p>{vehicle.dealerName}</p>
            <Link  to={`/vehicle/${vehicle.vin}`}>
            <button> View Details</button>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default InventoryList;
