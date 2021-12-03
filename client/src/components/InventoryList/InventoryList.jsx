import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

const host = "http://localhost:8080";

function DeleteModal({isOpen, vehicle, onClose, handleDelete}) {
  const { make, model, trim, vin} = vehicle;
  return (
    <>
    <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader
          close={
            <button className="close" onClick={onClose}>
              ×
            </button>
          }
          toggle={onClose}
        >
          Confirm Delete?
        </ModalHeader>
        <ModalBody>
          Do you want to remove {make} {model} {trim}  from inventory?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleDelete(vin)}>
            Remove
          </Button>{" "}
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function InventoryList(props) {
  const [inventory, setInventory] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteVehicle, setDelete] = useState({});

  // Toggle for Modal
  const toggleModal = () => setModal(!modal);

  const openModal = (vehicle) => {
    setDelete(vehicle);
    toggleModal();
  }

  const handleDelete = (vin) => {
    console.log(vin);
    deleteInventory(vin);
  }

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
        getInventory();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Link to="/inventory/">
        <button> Add Vehicle</button>
      </Link>
      <Link to="/form/">
        <button> Contact Dealer</button>
      </Link>

      {inventory &&
        inventory.map((vehicle) => (
          <div key={vehicle.vin}>
            <img src={`${host}/${vehicle.images}`} alt="Images" />
            <p>{vehicle.make}</p>
            <p>{vehicle.model}</p>
            <p>{vehicle.trim}</p>
            <p>{vehicle.dealerName}</p>
            <Link to={`/vehicle/${vehicle.vin}`}>
              <button> View Details</button>
            </Link>
            <Link to={`/vehicle/edit/${vehicle.vin}`}>
              <button> Edit</button>
            </Link>
            <button onClick={() => openModal(vehicle)}>Delete</button>
          </div>
        ))}
        <DeleteModal 
          onClose={toggleModal} 
          vehicle={deleteVehicle} 
          handleDelete={handleDelete} 
          isOpen={modal} 
        />
    </div>
  );
}

export default InventoryList;
