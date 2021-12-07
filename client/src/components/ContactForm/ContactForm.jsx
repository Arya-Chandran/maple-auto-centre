import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import "./ContactForm.scss";

const host = "http://localhost:8080";

const initialValues = {
  firstName: "",
  lastName: "",
  address: "",
  postalCode: "",
  phoneNumber: "",
  email: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
});

function ContactForm({ isOpen, vehicle, onClose, dealerEmail }) {
  const handleContactDealer = (vehicle, values, resetForm) => {
    const { firstName, lastName, address, postalCode, phoneNumber, email } =
      values;

    const contactData = {
      vehicle,
      dealerEmail,
      customerDetails: {
        firstName,
        lastName,
        address,
        postalCode,
        phoneNumber,
        email,
      },
    };

    axios
      .post(`http://localhost:8080/contactdealer`, contactData)
      .then((response) => {
        resetForm();
        onClose();
        alert("Thank you! Email sent to the dealer");
      })
      .catch((error) => {
        onClose();
        alert("Failed to contact dealer. Please try again!");
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            handleContactDealer(vehicle, values, resetForm);
          }}
        >
          {() => (
            <Form className="form">
              <ModalHeader
                close={
                  <button className="form__close" onClick={onClose}>
                    ×
                  </button>
                }
                toggle={onClose}
              >
                <h2 className="form__heading">Contact Dealer</h2>
              </ModalHeader>
              <ModalBody>
                <div className="form__column">
                  
                    <label className="form__label" htmlFor="">
                      First name
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="firstName"
                      name="firstName"
                    />
                    <ErrorMessage className="form__error" name="firstName" />
                  
                  
                    <label className="form__label" htmlFor="">
                      Last Name
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="lastName"
                      name="lastName"
                    />
                    <ErrorMessage name="lastName" />
               

                
                    <label className="form__label" htmlFor="">
                      Street Address
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="address"
                      name="address"
                    />
                    <ErrorMessage name="address" />
                

                  
                    <label className="form__label" htmlFor="">
                      Postal Code
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="postalCode"
                      name="postalCode"
                    />
                    <ErrorMessage name="postalCode" />
                

                 
                    <label className="form__label" htmlFor="">
                      Phone Number
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                    />
                    <ErrorMessage name="phoneNumber" />
                

                  
                    <label className="form__label" htmlFor="">
                      Email
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="email"
                      name="email"
                    />
                    <ErrorMessage name="email" />
                
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  Submit
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

export default ContactForm;
