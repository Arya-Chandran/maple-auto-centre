import React from "react";
import "./Details.scss";

function Details({ details }) {
  const { engine, driveTrain, transmission, interior, exterior } = details;
  return (
    <div className="info">
      <p className="info__heading">Specifications</p>
      <div className="info__wrapper">
        <div className="info__row">
          <h5 className="info__title">Engine</h5>
          <p className="info__content">{engine}</p>
        </div>
        <div className="info__row">
          <p className="info__title">Drivetrain</p>
          <p className="info__content">{driveTrain}</p>
        </div>
        <div className="info__row">
          <p className="info__title">Transmission</p>
          <p className="info__content">{transmission}</p>
        </div>
        <div className="info__row">
          <p className="info__title">Exterior</p>
          <p className="info__content">{exterior}</p>
        </div>
        <div className="info__row">
          <p className="info__title">Interior</p>
          <p className="info__content">{interior}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
