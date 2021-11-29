import React, { useState, useEffect } from "react";
import axios from "axios";

const host = "http://localhost:8080";

function DealershipDetails(props) {
  const { dealerId } = props;
  console.log("dealerid", dealerId);
  const [dealership, setDealership] = useState({});

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
    </div>
  );
}

export default DealershipDetails;
