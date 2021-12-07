import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import "./Register.scss";

const host = "http://localhost:8080";

const initialValues = {
  emailId: "",
  profileName: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  emailId: Yup.string().required("Email is required").email("Email is invalid"),
  profileName: Yup.string().required("ProfileName is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
});

function Register({ isOpen, onClose }) {
  const [errorMessage, setError] = useState(null);
  const [isCreated, setSuccess] = useState(false);

  const onSubmit = (values, resetForm) => {
    const { emailId, profileName, password, confirmPassword } = values;
    const userData = {
      username: emailId,
      name: profileName,
      password: password,
      confirmPassword: confirmPassword,
    };
    axios
      .post(`${host}/register`, userData)
      .then((response) => {
        resetForm();
        setSuccess(true);
        setError(null);
      })
      .catch((err) => {
        if (err.response) {
          const { message } = err.response.data;
          setError(message);
        } else {
          setError("Could not register a user");
        }
      });
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values, resetForm);
          }}
        >
          <Form className="register">
            <ModalHeader
              close={
                <button className="register__close" onClick={onClose}>
                  ×
                </button>
              }
              toggle={onClose}
            >
              <h2 className="register__heading">Register</h2>
            </ModalHeader>
            <ModalBody>
              {!isCreated && (
                <div className="register__wrapper">
                  <div className="register__section">
                    <label className="register__label" htmlFor="">
                      Username
                    </label>
                    <Field
                      className="register__field"
                      type="text"
                      id="emailId"
                      name="emailId"
                      placeholder="Email"
                    />
                    <div className="register__error">
                      <ErrorMessage name="emailId" />
                    </div>
                  </div>
                  <div className="register__section">
                    <label className="register__label" htmlFor="">
                      Profile Name
                    </label>
                    <Field
                      className="register__field"
                      type="text"
                      id="profileName"
                      name="profileName"
                      placeholder="Profile Name"
                    />
                    <div className="register__error">
                      <ErrorMessage name="profileName" />
                    </div>
                  </div>
                  <div className="register__section">
                    <label className="register__label" htmlFor="">
                      Password
                    </label>
                    <Field
                      className="register__field"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    <div className="register__error">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <div className="register__section">
                    <label className="register__label" htmlFor="">
                      Confirm Password
                    </label>
                    <Field
                      className="register__field"
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <div className="register__error">
                      <ErrorMessage name="confirmPassword" />
                    </div>
                  </div>
                </div>
              )}
              {isCreated && (
                <div className="register__label">
                  User registration is completed. Please login!
                </div>
              )}
              {errorMessage && (
                <p className="register__error">{errorMessage}</p>
              )}
            </ModalBody>
            <ModalFooter>
              {isCreated ? (
                <Button
                  color="primary"
                  onClick={() => {
                    onClose();
                    setSuccess(false);
                  }}
                >
                  Close
                </Button>
              ) : (
                <Button type="submit" color="primary">
                  Submit
                </Button>
              )}{" "}
              {!isCreated && <Button onClick={()=>{onClose(); setError(null)}}>Cancel</Button>}
            </ModalFooter>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default Register;
