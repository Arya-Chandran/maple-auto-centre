import React, { useState, useEffect } from "react";
import axios from "axios";
import Features from "../Features";
import Details from "../Details";
import { Link } from "react-router-dom";
import DealershipDetails from "../DealershipDetails";
import "./VehicleDetails.scss";
import PaymentCalculation from "../Modals/PaymentCalculation";

const host = "http://localhost:8080";
const APR = [
  { term: 36, rate: 4.99 },
  { term: 48, rate: 4.99 },
  { term: 60, rate: 3.99 },
  { term: 72, rate: 3.99 },
  { term: 84, rate: 2.99 },
  { term: 96, rate: 2.99 },
];

const initialValues = {
  downPayment: 0,
  term: APR[0].term,
  frequency: "Monthly",
};

const paymentFrequency = ["Weekly", "Bi-weekly", "Monthly"];

const fees = 2000;

const HST = 12;

const getInterest = (amount, term, rate) => {
  console.log(amount, term, rate);
  return (
    (amount * (rate / 12) * Math.pow(1 + rate / 12, term)) /
    (Math.pow(1 + rate / 12, term) - 1)
  );
};

function VehicleDetails(props) {
  const [vehicle, setVehicle] = useState({});
  const [modal, setModal] = useState(false);
  const [showPayment, setShow] = useState(false);
  const [payment, setPayment] = useState(null);

  // Toggle for Modal
  const toggleModal = () => setModal(!modal);

  const openModal = () => {
    toggleModal();
  };

  useEffect(() => {
    console.log("propss" ,props);
    const { vin } = props.match.params;
    getCurrentVehicle(vin);
    console.log("vehicle", vehicle);
  }, []);

  useEffect(() => {
    if(vehicle) {
      const {price} = vehicle;
      handleCalculation(initialValues, price);
    }
  }, [vehicle]);


  const getCurrentVehicle = (vin) => {
    axios
      .get(`${host}/inventory/${vin}`)
      .then((response) => {
        setVehicle(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getPaymentCount = (term, frequency) => {
    switch(frequency) {
      case "Monthly":
        return term;
      case "Bi-weekly":
        return term * 2;
      case "Weekly":
        return term * 4;
    }
  }

  const handleCalculation = (values, price) => {
    const { downPayment, term, frequency } = values;
    console.log(values, price);
    const amount = price - downPayment + fees;
    const selectedAPR = APR.find((option) => option.term == term);
    const rate = selectedAPR.rate;
    const principal = parseFloat(amount);
    const interest = parseFloat(rate) / 100 / 12;
    const numPayments = getPaymentCount(Number(term), frequency) ;
    // compute the monthly payment figure
    const x = Math.pow(1 + interest, numPayments); //Math.pow computes powers
    const payment = (principal * x * interest) / (x - 1);
    // const total = amount + interest;
    // const payment = total/term;
    console.log(price, amount, rate, interest, numPayments, payment);

    setShow(true);
    setPayment({
      price,
      amount,
      fees,
      rate,
      term,
      payment,
      downPayment,
      frequency
    });
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
          {showPayment && (
                    <div className="calculate__result">
                      Payment: ${payment.payment}
                      ${payment.amount}
                      ${payment.fees}
                      ${payment.term}
                      ${payment.payment}
                      ${payment.frequency}
                      ${payment.downPayment}
                    </div>
                  )}
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
        initialValues={initialValues}
        handleCalculation={handleCalculation}
      />
    </div>
  );
}

export default VehicleDetails;
