import React from "react";
import "./PricingSummary.scss";

function PricingSummary({ payment }) {
  console.log(payment);
  const { price, amount, fees, term, frequency, downPayment } = payment;

  return (
    <div className="pricing">
      <p className="pricing__heading">Pricing Summary</p>
      <div className="pricing__wrapper">
        <div className="pricing__row">
          <h5 className="pricing__title">Base Price</h5>
          <p className="pricing__content">${price}</p>
        </div>
        <div className="pricing__row">
          <p className="pricing__title">Total Fees</p>
          <p className="pricing__content">${fees}</p>
        </div>
        <div className="pricing__row">
          <p className="pricing__title">Total Amount</p>
          <p className="pricing__content">${amount}</p>
        </div>
        <div className="pricing__row">
          <p className="pricing__title">Down Payment</p>
          <p className="pricing__content">${downPayment}</p>
        </div>
        <div className="pricing__row">
          <p className="pricing__title">Frequency</p>
          <p className="pricing__content">{frequency}</p>
        </div>
        <div className="pricing__row">
          <p className="pricing__title">Term</p>
          <p className="pricing__content">{term} months</p>
        </div>
      </div>
      <div className="pricing__row">
        <p className="pricing__title">Payment Amount</p>
        <p className="pricing__content">${payment.payment}</p>
      </div>
    </div>
  );
}

export default PricingSummary;
