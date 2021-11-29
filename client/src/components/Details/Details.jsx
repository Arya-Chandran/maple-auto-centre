import React from "react";

function Details({ details }) {
  const {engine,driveTrain, transmission, interior, exterior} = details;
  return (
    <div>
      <p>Vehicle Details</p>
      <div>
        <p>{engine}</p>
        <p>{driveTrain}</p>
        <p>{transmission}</p>
        <p>{interior}</p>
        <p>{exterior}</p>
      </div>
    </div>
  );
}

export default Details;
