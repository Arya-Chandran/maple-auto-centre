import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

const emailConfig = {
  SERVICE_ID: "service_ynz1m9f",
  TEMPLATE_ID: "template_kugkbit",
  USER_ID: "user_MMkM1hwqdLgOeapxHuo7P",
  URL: "https://api.emailjs.com/api/v1.0/email/send",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Email is invalid"),
});

function ContactForm({ isOpen, vehicle, onClose, dealerEmail, dealerName }) {
  const handleContactDealer = (vehicle, values, resetForm) => {
    const {} = vehicle;
    const { year, make, model, trim, vin } = vehicle;
    const { firstName, lastName, address, postalCode, phoneNumber, email } =
      values;
    const { SERVICE_ID, TEMPLATE_ID, USER_ID, URL } = emailConfig;

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

    var data = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: USER_ID,
      template_params: {
        dealerEmail,
        dealerName,
        firstName,
        lastName,
        address,
        postalCode,
        phoneNumber,
        email,
        year,
        make,
        model,
        trim,
        vin,
      },
    };

    axios
      .post(URL, data)
      .then(() => {
        alert("Your mail is sent!");
      })
      .catch((error) => {
        alert("Oops... " + JSON.stringify(error));
      });

    resetForm();
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Calling submit");
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
                <div className="form__wrapper">
                  <div className="form__section">
                    <label className="form__label" htmlFor="">
                      First name
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="firstName"
                      name="firstName"
                    />
                    <div className="form__error">
                      <ErrorMessage className="form__error" name="firstName" />
                    </div>
                  </div>
                  <div className="form__section">
                    <label className="form__label" htmlFor="">
                      Last Name
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="lastName"
                      name="lastName"
                    />
                    <div className="form__error">
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>
                  <div className="form__section">
                    <label className="form__label" htmlFor="">
                      Street Address
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="address"
                      name="address"
                    />
                    <div className="form__error">
                      <ErrorMessage name="address" />
                    </div>
                  </div>{" "}
                  <div className="form__section">
                    <label className="form__label" htmlFor="">
                      Postal Code
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="postalCode"
                      name="postalCode"
                    />
                    <div className="form__error">
                      <ErrorMessage name="postalCode" />
                    </div>
                  </div>{" "}
                  <div className="form__section">
                    <label className="form__label" htmlFor="">
                      Phone Number
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                    />
                    <div className="form__error">
                      <ErrorMessage name="phoneNumber" />
                    </div>
                  </div>
                  <div className="form__section">
                    <label className="form__label" htmlFor="">
                      Email
                    </label>
                    <Field
                      className="form__field"
                      type="text"
                      id="email"
                      name="email"
                    />
                    <div className="form__error">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  Submit
                </Button>
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
