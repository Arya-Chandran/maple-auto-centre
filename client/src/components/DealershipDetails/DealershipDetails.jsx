import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "../ContactForm";
import "./DealershipDetails.scss";
import { Button, Tooltip } from "reactstrap";
import { FcBusinessContact } from "react-icons/fc";
import { IoMdContacts } from "react-icons/io";
import { HiMail } from "react-icons/hi";

const host = "http://localhost:8080";

function DealershipDetails({ vehicle }) {
  const { dealerId } = vehicle;
  console.log("dealerid", dealerId);
  const [dealership, setDealership] = useState({});
  const [modal, setModal] = useState(false);
  const [isTooltip, setTooltip] = useState(false);

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getCurrentDealership(dealerId);
  }, []);

  console.log("dealership", dealership);

  const getCurrentDealership = (dealerId) => {
    axios
      .get(`${host}/dealership/${dealerId}`)
      .then((response) => {
        const { foundDealership } = response.data;
        setDealership(foundDealership);
      })
      .catch((error) => console.log(error));
  };

  

  return (
    <div className="dealer">
      {Object.keys(dealership).length !== 0 && (
        <div className="dealer__info">
          <p className="dealer__name">{dealership.dealerName}</p>
          {/* <p>Address</p> */}
          <p className="dealer__address">{dealership.dealerAddress}</p>
          {/* <p>Contact Information</p> */}
          <p className="dealer__contact">{dealership.dealerPhoneNumber}</p>
          <p className="dealer__contact">{dealership.emailId}</p>
          <HiMail
            onClick={toggleModal}
            id="ContactDealer"
            className="dealer__icon"
          />
          <Tooltip
            placement="right"
            isOpen={isTooltip}
            target="ContactDealer"
            toggle={() => {
              setTooltip(!isTooltip);
            }}
          >
            Contact Dealer
          </Tooltip>
          {/* <p className="dealer__contact">Contact Dealer</p> */}
        </div>
      )}

      {/* <Button onClick={toggleModal}>Contact Dealer</Button> */}
      <ContactForm
        onClose={toggleModal}
        vehicle={vehicle}
        dealerEmail={dealership.emailId}
        isOpen={modal}
      />
    </div>
  );
}

export default DealershipDetails;
