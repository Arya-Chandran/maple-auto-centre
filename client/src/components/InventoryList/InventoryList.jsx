import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./InventoryList.scss";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
// import icon from "../../assets/icons/delete_outline-24px.svg";
import delSrc from "../../assets/icons/trash.png";
import editSrc from "../../assets/icons/edit.png";

const host = "http://localhost:8080";

function InventoryList(props) {
  const [inventory, setInventory] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteVehicle, setDelete] = useState({});

  // Toggle for Modal
  const toggleModal = () => setModal(!modal);

  const openModal = (vehicle) => {
    setDelete(vehicle);
    toggleModal();
  };

  const handleDelete = (vin) => {
    console.log(vin);
    deleteInventory(vin);
  };

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

  const deleteInventory = (vin) => {
    axios
      .delete(`${host}/inventory/:vin`)
      .then((response) => {
        setDelete({});
        toggleModal();
        getInventory();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Link to="/inventory/add">
        <Button> Add Vehicle</Button>
      </Link>

      <div className="vehicleCard">
        {inventory &&
          inventory.map((vehicle) => (
            <div className="vehicleCard__wrapper" key={vehicle.vin}>
              <img
                className="vehicleCard__image"
                src={`${host}/${vehicle.images}`}
                alt="Images"
              />
              <div className="vehicleCard__main">
                <div className="vehicleCard__row">
                  <p className="vehicleCard__year">{vehicle.year}</p>
                  <p className="vehicleCard__make">{vehicle.make}</p>
                </div>
                <div className="vehicleCard__row">
                  <h2 className="vehicleCard__model">{vehicle.model}</h2>
                  <h2 className="vehicleCard__trim">{vehicle.trim}</h2>
                </div>
                <p className="vehicleCard__title">Selling Price</p>
                <p className="vehicleCard__price">${vehicle.price}</p>
                <p className="vehicleCard__vin">VIN: {vehicle.vin}</p>
                <p className="vehicleCard__name">{vehicle.dealerName}</p>
                <Link to={`/vehicle/${vehicle.vin}`}>
                  <Button className="vehicleCard__view"> View Details</Button>
                </Link>
                <div className="vehicleCard__btnWrapper">
                  <Link to={`/vehicle/edit/${vehicle.vin}`}>
                    <img src={editSrc} alt="edit icon" />
                  </Link>
                  <img
                    src={delSrc}
                    onClick={() => openModal(vehicle)}
                    alt="delete icon"
                  />
                  {/* <button onClick={() => openModal(vehicle)}>Delete</button> */}
                </div>
              </div>
            </div>
          ))}
        <DeleteModal
          onClose={toggleModal}
          vehicle={deleteVehicle}
          handleDelete={handleDelete}
          isOpen={modal}
        />
      </div>
    </div>
  );
}

export default InventoryList;
