import React, { useState } from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./PaymentCalculation.scss";

const APR = [
  { term: 36, rate: 4.99 },
  { term: 48, rate: 4.99 },
  { term: 60, rate: 3.99 },
  { term: 72, rate: 3.99 },
  { term: 84, rate: 2.99 },
  { term: 96, rate: 2.99 },
];


const validationSchema = Yup.object({
  downpayment: Yup.number().required("Required"),
  frequency: Yup.string().required("Required"),
});

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

function PaymentCalculation({ isOpen, vehicle, onClose, initialValues, handleCalculation }) {
  const { make, model, trim, vin, price } = vehicle;

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose}>
        <Formik
          initialValues={initialValues}
          //   validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleCalculation(values, price);
            setSubmitting(false);
            console.log(values);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="calculate">
              <ModalHeader
                close={
                  <button className="calculate__close">
                    ×
                  </button>
                }
                toggle={onClose}
              >
                <h2 className="calculate__heading"> Payment Calculation</h2>
              </ModalHeader>
              <ModalBody>
                <div className="calculate__wrapper">
                  <div className="calculate__section">
                    <label className="calculate__label" htmlFor="">
                      Down Payment
                    </label>
                    <Field
                      className="calculate__field"
                      type="text"
                      id="downPayment"
                      name="downPayment"
                    />
                     <div className="calculate__error">
                    <ErrorMessage name="downPayment" />
                    </div>
                  </div>
                  <div className="calculate__section">
                    <label className="calculate__label" htmlFor="">
                      Annual Percentage rate
                    </label>
                    <Field
                      className="calculate__field"
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
                  </div>
                  <div className="calculate__section">
                    <label className="calculate__label" htmlFor="">
                      Frequency
                    </label>
                    <div className="calculate__row">
                      <Field
                        className="calculate__field"
                        type="text"
                        id="frequency"
                        name="frequency"
                      >
                        {({ field }) => {
                          return paymentFrequency.map((option) => {
                            return (
                              <React.Fragment key={option}>
                                <input
                                  //   className="calculate__radioBtn"
                                  type="radio"
                                  id={option}
                                  {...field}
                                  value={option}
                                  checked={field.value === option}
                                />
                                <label
                                  className="calculate__radioBtn"
                                  htmlFor={option}
                                >
                                  {option}
                                </label>
                              </React.Fragment>
                            );
                          });
                        }}
                      </Field>
                      <ErrorMessage name="frequency" />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Calculate
                </Button>{" "}
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
