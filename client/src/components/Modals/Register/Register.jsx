import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import "./Register.scss";

const host = "http://localhost:8080";

const initialValues = {
  emailId: "",
  profileName: "",
  password: "",
};

const validationSchema = Yup.object({
  emailId: Yup.string().required("Required"),
  profileName: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Register({ isOpen, onClose }) {
  const [errorMessage, setError] = useState(null);
  const [isCreated, setSuccess] = useState(false);


  const onSubmit = (values, resetForm) => {
    const { emailId, profileName, password } = values;
    console.log(emailId, profileName, password);
    const userData = {
      username: emailId,
      name: profileName,
      password: password,
    };
    axios
      .post(`http://localhost:8080/register`, userData)
      .then((response) => {
        resetForm();
        setSuccess(true);
        setError(null)
      })
      .catch((err) => {
        console.log(err.response.data);
        if(err.response) {
          const {message} = err.response.data;
          setError(message);
        } else {
          setError("Could not register a user");
        }
        
        // onClose();
        // alert("User registration failed. Please try again!");
      });
  };
  console.log(isOpen);
  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          //  onSubmit={onSubmit (values,resetForm)}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            onSubmit(values, resetForm);
          }}
        >
          <Form>
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
              {!isCreated && (
                <div>
                  <label htmlFor="">Email</label>
                  <Field className="" type="text" id="emailId" name="emailId" />
                  <ErrorMessage className="" name="emailId" />

                  <label htmlFor="">Profile Name</label>
                  <Field
                    className=""
                    type="text"
                    id="profileName"
                    name="profileName"
                  />
                  <ErrorMessage className="" name="profileName" />

                  <label htmlFor="">Password</label>
                  <Field
                    className=""
                    type="text"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage className="" name="password" />
                </div>
              )}
              {isCreated && (
                <div>User registration is completed. Please login!</div>
              )}
                {errorMessage && <p>{errorMessage}</p>}
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
              {!isCreated && (
                <Button onClick={onClose} >
                  Cancel
                </Button>
              )}
            </ModalFooter>
          
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default Register;
