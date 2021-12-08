import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input } from "reactstrap";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "./AddVehicle.scss";
import { IoMdArrowRoundBack } from "react-icons/io";

const host = "http://localhost:8080";

const onSubmit = (history, dealerList, values) => {
  const {
    year,
    make,
    model,
    trim,
    vin,
    images,
    dealerName,
    price,
    features,
    details,
  } = values;

  const selectedDealer = dealerList.find(
    (dealer) => dealer.dealerName === dealerName
  );
  const dealerId = selectedDealer.dealerId;

  const formData = new FormData();
  formData.append("year", year);
  formData.append("make", make);
  formData.append("model", model);
  formData.append("trim", trim);
  formData.append("vin", vin);
  formData.append("images", images);
  formData.append("dealerId", dealerId);
  formData.append("dealerName", dealerName);
  formData.append("price", price);
  formData.append("features", JSON.stringify(features));
  formData.append("engine", details.engine);
  formData.append("driveTrain", details.driveTrain);
  formData.append("transmission", details.transmission);
  formData.append("interior", details.interior);
  formData.append("exterior", details.exterior);

  axios
    .post(`${host}/inventory`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      history.push("/", {});
    });
};

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = Yup.object({
  year: Yup.date().required("Required"),
  make: Yup.string().required("Required"),
  model: Yup.string().required("Required"),
  trim: Yup.string().required("Required"),
  vin: Yup.string()
    .required("Required")
    .min(16, "Must be 17 characters")
    .max(16, "Must be 17 characters"),
  dealerName: Yup.string().required("Required"),
  images: Yup.mixed()
    .required("Required")
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  price: Yup.number().required("Required"),
  features: Yup.array().required("Required"),
  details: Yup.object({
    engine: Yup.string().required("Required"),
    driveTrain: Yup.string().required("Required"),
    transmission: Yup.string().required("Required"),
    interior: Yup.string().required("Required"),
    exterior: Yup.string().required("Required"),
  }),
});

function AddVehicle({ vehicle = {}, isEdit = false, history }) {
  const [dealerList, setDealer] = useState([]);

  useEffect(() => {
    getDropdownList("dealership");
  }, []);

  const initialValues = isEdit
    ? vehicle
    : {
        year: "",
        make: "",
        model: "",
        trim: "",
        vin: "",
        dealerName: "",
        price: "",
        images: null,
        features: [""],
        details: {
          engine: "",
          driveTrain: "",
          transmission: "",
          interior: "",
          exterior: "",
        },
      };

  const getDropdownList = (property) => {
    axios
      .get(`http://localhost:8080/inventory/dropdown/${property}`)
      .then((response) => {
        setDealer(response.data);
      })
      .catch((error) => console.log(error));
  };
  const goback = (e) => {
    e.preventDefault();
    history.push("/", {});
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(history, dealerList, values);
      }}
    >
      {({ values }) => (
        <Form className="vehicleDetails">
          <div className="vehicleDetails__wrapper">
            <div className="vehicleDetails__arrowWrapper">
              <IoMdArrowRoundBack
                className="vehicleDetails__arrow"
                onClick={(e) => goback(e)}
              />
              <p className="vehicleDetails__arrowContent">
                Back to previous page
              </p>
            </div>
            <h1 className="vehicleDetails__heading">Add New Car</h1>
            <div className="vehicleDetails__container">
              <div className="vehicleDetails__subContainer">
                <h2 className="vehicleDetails__subHeading">Basic Details</h2>

                <label className="vehicleDetails__label" htmlFor="">
                  Year
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="year"
                  name="year"
                  placeholder="Year"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="year" />
                </div>

                <label className="vehicleDetails__label" htmlFor="">
                  Make
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="make"
                  name="make"
                  placeholder="Make"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="make" />
                </div>

                <label className="vehicleDetails__label" htmlFor="">
                  Model
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="model"
                  name="model"
                  placeholder="Model"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="model" />
                </div>

                <label className="vehicleDetails__label" htmlFor="">
                  Trim
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="trim"
                  name="trim"
                  placeholder="Trim"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="trim" />
                </div>

                <label className="vehicleDetails__label" htmlFor="">
                  VIN
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="vin"
                  name="vin"
                  placeholder="vin"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="vin" />
                </div>

                <label className="vehicleDetails__label" htmlFor="">
                  Price
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Price"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="price" />
                </div>
                <div className="vehicleDetails__image">
                  <Field
                    id="images"
                    name="images"
                    type="file"
                    render={({
                      field,
                      form: { setFieldValue, touched, errors },
                    }) => (
                      <div>
                        <label className="vehicleDetails__label" htmlFor="">
                          Select Images
                        </label>
                        <Input
                          className="vehicleDetails__field"
                          type="file"
                          name="images"
                          id="images"
                          onChange={(event) => {
                            setFieldValue(
                              "images",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        <div className="vehicleDetails__error">
                          <ErrorMessage name="images" />
                        </div>
                      </div>
                    )}
                  />
                </div>

                {dealerList.length > 0 && (
                  <>
                    <label className="vehicleDetails__label" htmlFor="">
                      Dealership Name
                    </label>
                    <Field
                      className="vehicleDetails__field"
                      component="select"
                      as="select"
                      id="dealerName"
                      name="dealerName"
                      placeholder="Dealership List"
                    >
                      <option key={0} disabled value="">
                        Select a dealership
                      </option>
                      {dealerList.map(({ dealerId, dealerName }) => {
                        return (
                          <option key={dealerId} value={dealerName}>
                            {dealerName}
                          </option>
                        );
                      })}
                    </Field>
                    <div className="vehicleDetails__error">
                      <ErrorMessage name="dealerName" />
                    </div>
                  </>
                )}
              </div>
              <div className="vehicleDetails__subContainer">
                <h2 className="vehicleDetails__subHeading">Specifications</h2>
                <label className="vehicleDetails__label" htmlFor="">
                  Engine
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="engine"
                  name="details.engine"
                  placeholder="Engine"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="details.engine" />
                </div>

                <label className="vehicleDetails__label" htmlFor="">
                  DriveTrain
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="driveTrain"
                  name="details.driveTrain"
                  placeholder="DriveTrain"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="details.driveTrain" />
                </div>

                <label className="vehicleDetails__label" htmlFor="">
                  Transmission
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="transmission"
                  name="details.transmission"
                  placeholder="Transmission"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="details.transmission" />
                </div>

                <label className="vehicleDetails__label" htmlFor="">
                  Exterior
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="exterior"
                  name="details.exterior"
                  placeholder="Exterior color"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="details.exterior" />
                </div>

                <label className="vehicleDetails__label" htmlFor="">
                  Interior
                </label>
                <Field
                  className="vehicleDetails__field"
                  type="text"
                  id="interior"
                  name="details.interior"
                  placeholder="Interior color"
                />
                <div className="vehicleDetails__error">
                  <ErrorMessage name="details.interior" />
                </div>
                <h2 className="vehicleDetails__subHeading">Features</h2>
                <FieldArray
                  className="vehicleDetails__field"
                  type="text"
                  id="features"
                  name="features"
                  placeholder=""
                >
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { features } = values;
                    return (
                      <div>
                        {features.map((feature, index) => (
                          <div key={index}>
                            <Field
                              className="vehicleDetails__field"
                              name={`features[${index}]`}
                            />
                            <button
                              className="vehicleDetails__field"
                              type="button"
                              onClick={() => push("")}
                            >
                              {" "}
                              +{" "}
                            </button>
                            {index > 0 && (
                              <button
                                className="vehicleDetails__field"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                {" "}
                                -{" "}
                              </button>
                            )}
                            <div className="vehicleDetails__error">
                              <ErrorMessage name="features" />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <div className="vehicleDetails__error">
                  <ErrorMessage name="features" />
                </div>
              </div>
            </div>
            <div className="vehicleDetails__btnWrapper">
              <Button
                type="submit"
                className="vehicleDetails__btn"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddVehicle;
