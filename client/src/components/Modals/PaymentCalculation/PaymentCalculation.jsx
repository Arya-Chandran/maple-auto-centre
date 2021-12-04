import React, { useState } from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

const validationSchema = Yup.object({
  downpayment: Yup.number().required("Required"),
  frequency: Yup.string().required("Required"),
});

const paymentFrequency = ["Weekly", "Bi-weekly", "Monthly"];

const fees = 2000;

const HST = 12;



const getInterest = (amount, term, rate) => {
    console.log(amount, term, rate)
    return amount * (rate/12) * (Math.pow((1 + (rate/12)), term))/ ((Math.pow((1 + (rate/12)), term)) - 1);
}

function PaymentCalculation({ isOpen, vehicle, onClose }) {
  const { make, model, trim, vin, price } = vehicle;
  const [showPayment, setShow] = useState(false);
  const [payment, setPayment] = useState({});

  const handleCalculation = (values, price) => {
    const {downPayment, term, frequency } = values;
    console.log(values);
    const amount = price - downPayment + fees;
    const selectedAPR = APR.find((option) => option.term == term);
    const rate = selectedAPR.rate;
    const principal = parseFloat(amount);
    const interest = parseFloat(rate) / 100 / 12;
    const numPayments = term;
    // compute the monthly payment figure
    const x = Math.pow(1 + interest, numPayments); //Math.pow computes powers
    const payment = (principal*x*interest)/(x-1);
    // const total = amount + interest;
    // const payment = total/term;
    console.log(price, amount, rate, interest, numPayments, payment);

    setShow(true);
    setPayment({
       price, amount, fees, rate, term, payment 
    })
}

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose}>
        <Formik
          initialValues={initialValues}
        //   validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting}) => {
            handleCalculation(values, price);
            setSubmitting(false);
            console.log(values);
          }}
        >
          {({isSubmitting}) => (
            <Form>
              <ModalHeader
                close={
                  <button className="close" onClick={onClose}>
                    ×
                  </button>
                }
                toggle={onClose}
              >
                Estimate Your Payment
              </ModalHeader>
              <ModalBody>
                <label htmlFor="">Down Payment</label>
                <Field
                  className=""
                  type="text"
                  id="downPayment"
                  name="downPayment"
                />
                <ErrorMessage name="downPayment" />

                <label htmlFor="">Annual Percentage rate</label>
                <Field
                className=""
                component="select"
                as="select"
                id="term"
                name="term"
                placeholder="Select APR"
              >
                {APR.map((termOption) => {
                  const { term, rate } = termOption;
                  return (
                    <option key={term} value={term}>
                      {`${rate}% APR for ${term} Months`}
                    </option>
                  );
                })}
              </Field>
                <ErrorMessage name="rate" />

                <label htmlFor="">Frequency</label>
                <Field className="" type="text" id="frequency" name="frequency">
                  {({ field }) => {
                    return paymentFrequency.map((option) => {
                      return (
                        <React.Fragment key={option}>
                          <input
                            type="radio"
                            id={option}
                            {...field}
                            value={option}
                            checked={field.value === option}
                          />
                          <label htmlFor={option}>{option}</label>
                        </React.Fragment>
                      );
                    });
                  }}
                </Field>
                <ErrorMessage name="frequency" />

                {showPayment && (
                    <>
                    Payment: ${payment.payment}
                    </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" disabled={isSubmitting}>Submit</Button>{" "}
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default PaymentCalculation;
