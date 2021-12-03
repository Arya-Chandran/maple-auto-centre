import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "../ContactForm";

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
    <div>
      {Object.keys(dealership).length !== 0 && (
        <div>
          <p>Dealership</p>
          <p>{dealership.dealerName}</p>
          <p>Address</p>
          <p>{dealership.dealerAddress}</p>
          <p>Contact Information</p>
          <p>{dealership.dealerPhoneNumber}</p>
          <p>{dealership.emailId}</p>
        </div>
      )}
      <button  onClick={toggleModal}>Contact Dealer</button>
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
