import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "../ContactForm";
import './DealershipDetails.scss';
import { Button} from "reactstrap";

const host = "http://localhost:8080";

function DealershipDetails({vehicle}) {
  const { dealerId } = vehicle;
  console.log("dealerid", dealerId);
  const [dealership, setDealership] = useState({});
  const [modal, setModal] = useState(false);

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  }

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
        </div>
      )}
      <Button onClick={toggleModal}>Contact Dealer</Button>
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
