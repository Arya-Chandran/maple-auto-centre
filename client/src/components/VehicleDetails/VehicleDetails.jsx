import React, { useState, useEffect } from "react";
import axios from "axios";
import Features from "../Features";
import Details from "../Details";
import { Link } from "react-router-dom";
import DealershipDetails from "../DealershipDetails";
import "./VehicleDetails.scss";
import PaymentCalculation from "../Modals/PaymentCalculation";

const host = "http://localhost:8080";

function VehicleDetails(props) {
  const [vehicle, setVehicle] = useState({});
  const [modal, setModal] = useState(false);

  // Toggle for Modal
  const toggleModal = () => setModal(!modal);

  const openModal = () => {
    toggleModal();
  };

  useEffect(() => {
    console.log(props);
    const { vin } = props.match.params;
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
    <div className="details">
      {Object.keys(vehicle).length !== 0 && (
        <div className="details__wrapper">
          <div></div>
          <div className="details__main">
            <p className="details__year">{vehicle.year}</p>
            <div className="details__row">
              <p className="details__make">{vehicle.make}</p>
              <p className="details__model">{vehicle.model}</p>
            </div>
            <p className="details__trim">{vehicle.trim}</p>
            <p className="details__vin">VIN {vehicle.vin}</p>
          </div>
          <img
            className="details__image"
            src={`${host}/${vehicle.images[0]}`}
            alt="Images"
          />
          <p className="details__title">Adjusted price</p>
          <p className="details__price">${vehicle.price}</p>
          <button onClick={() => openModal(vehicle)}>
            Calculate
          </button>
          <div className="details__section">
            <Features features={vehicle.features} />
            <Details details={vehicle.details} />
          </div>
          <DealershipDetails vehicle={vehicle} />
        </div>
      )}
      <PaymentCalculation
        onClose={toggleModal}
        vehicle={vehicle}
        isOpen={modal}
      />
    </div>
  );
}

export default VehicleDetails;
