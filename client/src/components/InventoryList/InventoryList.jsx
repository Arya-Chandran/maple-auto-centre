import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "reactstrap";
import { BiEditAlt } from "react-icons/bi";
import { AiFillFolderAdd } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "./InventoryList.scss";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
// import icon from "../../assets/icons/delete_outline-24px.svg";
import delSrc from "../../assets/icons/trash.png";
import editSrc from "../../assets/icons/edit.png";

const host = "http://localhost:8080";

function InventoryList(props) {
  console.log("Inventorylist props", props);
  const [inventory, setInventory] = useState([]);
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(0);
  const [isAdmin, setAdmin] = useState(false);
  const [deleteVehicle, setDelete] = useState({});
  const { profileData } = props;
  const [addTooltip, setAddTooltip] = useState(false);
  const [editTooltip, setEditTooltip] = useState(false);
  const [deleteTooltip, setDeleteTooltip] = useState(false);

  // const isAdmin= sessionStorage.getItem("isAdmin");
  console.log("admin", isAdmin);

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

  useEffect(() => {
    console.log("Inventory props", props.profileData);
    if (profileData) {
      const { isAdmin } = profileData;
      setAdmin(isAdmin);
      console.log("profileData", profileData);
    }
  }, [profileData]);

  const getInventory = () => {
    axios
      .get(`${host}/inventory`)
      .then((response) => {
        const inventory = response.data;
        setInventory(inventory);
        setCount(inventory.length);
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
      <div className="stockDetails">
        <div>
          <h1 className="stockDetails__heading">Inventory List</h1>
          {count && (
            <h3 className="stockDetails__count">{count} vehicles found</h3>
          )}
        </div>
        <div className="stockDetails__imageWrapper">
          {isAdmin && (
            <Link to="/inventory/add">
              <AiFillFolderAdd id="add" className="stockDetails__image" {...props} />
              <Tooltip
            placement="right"
            isOpen={addTooltip}
            target="add"
            toggle={() => {
              setAddTooltip(!addTooltip);
            }}
          >
            Add vehicle
          </Tooltip>
              {/* <Button> Add Vehicle</Button> */}
            </Link>
          )}
        </div>
      </div>
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
                <p className="vehicleCard__vin">
                  <span className="vehicleCard__vin--highlight">VIN: </span>
                  {vehicle.vin}
                </p>
                <p className="vehicleCard__name">{vehicle.dealerName}</p>
                <Link to={`/vehicle/${vehicle.vin}`}>
                  <Button className="vehicleCard__view"> View Details</Button>
                </Link>
                {isAdmin && (
                  <div className="vehicleCard__btnWrapper">
                    <Link to={`/vehicle/edit/${vehicle.vin}`}>
                      {/* <img src={editSrc} alt="edit icon" /> */}
                      <BiEditAlt id="edit" className="vehicleCard__icons" />
                      {/* <Tooltip
            placement="right"
            isOpen={editTooltip}
            target="edit"
            toggle={() => {
              setEditTooltip(!editTooltip);
            }}
          >
            Edit vehicle
          </Tooltip> */}
                    </Link>
                    {/* <img
                      src={delSrc}
                      onClick={() => openModal(vehicle)}
                      alt="delete icon"
                    /> */}
                    <MdDelete id="delete"
                      className="vehicleCard__icons"
                      onClick={() => openModal(vehicle)}
                    />
                        {/* <Tooltip
            placement="right"
            isOpen={deleteTooltip}
            target="delete"
            toggle={() => {
              setDeleteTooltip(!deleteTooltip);
            }}
          >
            Remove vehicle
          </Tooltip> */}
                    {/* <button onClick={() => openModal(vehicle)}>Delete</button> */}
                  </div>
                )}
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
