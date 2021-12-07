import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import "./Login.scss";
import Register from "../Modals/Register";
import logo from "../../assets/icons/logo.png";

const host = "http://localhost:8080";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Email is required")
    .email("Email is invalid"),
  password: Yup.string().required("Required"),
});

function Login(props) {
  const [errorMessage, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const { isLoggedIn, setLoggedIn, history, fetchProfile } = props;
  console.log(props);

  const toggleModal = () => {
    console.log("toggle");
    setModal(!modal);
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Calling useffect");
      history.push("/inventory");
    }
  }, []);

  const handleSubmit = (values, setLoggedIn, resetForm) => {
    const { username, password } = values;
    // endpoint is at http://localhost:8080/login
    axios
      .post("http://localhost:8080/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("clientAuthToken", response.data.token);
        sessionStorage.setItem("isAdmin", response.data.isAdmin);
        setLoggedIn(true);
        fetchProfile(response.data.token);
        history.push("/inventory");
      })
      .catch((err) => {
        if (err.response) {
          const { message } = err.response.data;
          setError(message);
        } else {
          setError("Please check your credentials.");
        }

        setLoggedIn(false);
        resetForm();
      });
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__leftContainer">
          <img className="login__image" src={logo} alt="logo" />
          <h1 className="login__heading">
            {" "}
            <span className="login__heading--light"> Welcome to </span>{" "}
            Maple-Auto Centre
          </h1>
        </div>
        <div className="login__rightContainer">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              handleSubmit(values, setLoggedIn, resetForm);
            }}
          >
            <Form className="login__form">
        
              <div className="login__section">
                <label className="login__label" htmlFor="">
                  Username
                </label>
                <Field
                  className="login__field"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Email"
                />
                <div className="register__error">
                  <ErrorMessage className="" name="username" />
                </div>
              </div>
              <div className="login__section">
                <label className="login__label" htmlFor="">
                  Password
                </label>
                <Field
                  className="login__field"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <div className="login__error">
                  <ErrorMessage className="" name="password" />
                </div>
              </div>
              <div className="login__section login__btnWrapper" >
              <Button color="primary" type="submit">
                Login
              </Button>
              </div>
            </Form>
          </Formik>
          {errorMessage && <p className="login__error">{errorMessage}</p>}
          <div className="login__btnWrapper" >
          <Button className="login__btn" color="primary" onClick={toggleModal}>
            Register
          </Button>
          </div>
          <Register onClose={toggleModal} isOpen={modal} />
        </div>
      </div>
    </div>
  );
}

export default Login;
