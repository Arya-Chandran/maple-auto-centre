import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import ImageUploader from "react-images-upload";
import "./EditVehicleDetails.scss";

const host = "http://localhost:8080";

const onSubmit = (history, dealerList, values) => {
  console.log("values", history, values);

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

  const dealerId = dealerList.find(
    (dealer) => dealer.dealerName === dealerName
  ).dealerId;

  const formData = new FormData();
  formData.append("year", year);
  formData.append("make", make);
  formData.append("model", model);
  formData.append("trim", trim);
  formData.append("vin", vin);
  formData.append("images", images[0]);
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
    .put(`http://localhost:8080/inventory/${vin}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      history.push("/", {});
    });
};

const validationSchema = Yup.object({
  year: Yup.date().required("Required"),
  make: Yup.string().required("Required"),
  model: Yup.string().required("Required"),
  trim: Yup.string().required("Required"),
  vin: Yup.string().required("Required"),
  dealerName: Yup.string().required("Required"),
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

function EditVehicleDetails(props) {
  console.log("props:",props)
  const [dealerList, setDealer] = useState([]);
  const [vehicle, setVehicle] = useState(null);

  console.log("dealerList", dealerList);

  useEffect(() => {
    console.log(props);
    const { vin } = props.match.params;
    getCurrentVehicle(vin);
    console.log("vehicle", vehicle);
  }, []);


  useEffect(() => {
    getDropdownList("dealership");
  }, []);

  const initialValues = {
      year: vehicle ? vehicle.year : "",
      make: vehicle ? vehicle.make : "",
      model: vehicle ? vehicle.model : "",
      trim: vehicle ? vehicle.trim : "",
      vin: vehicle ? vehicle.vin : "",
      dealerName:vehicle ? vehicle.dealerName : "",
      price: vehicle ? vehicle.price : "",
      images: vehicle ? vehicle.images : [],
      features: vehicle ? vehicle.features : [""],
      details: {
        engine:  vehicle ? vehicle.details.engine : "",
        driveTrain: vehicle ? vehicle.details.driveTrain : "",
        transmission: vehicle ? vehicle.details.transmission : "",
        interior: vehicle ? vehicle.details.interior : "",
        exterior:vehicle ? vehicle.details.exterior : "",
      },
    };

    const getCurrentVehicle = (vin) => {
      axios
        .get(`${host}/inventory/${vin}`)
        .then((response) => {
          console.log(response.data);
          setVehicle(response.data);
        })
        .catch((error) => console.log(error));
    };
  

  const getDropdownList = (property) => {
    axios
      .get(`http://localhost:8080/inventory/dropdown/${property}`)
      .then((response) => {
        console.log("response", response.data);
        setDealer(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(props.history, dealerList, values);
      }}
    >
      {({ values }) => (
        <Form className="vehicleDetails">
          <div className="vehicleDetails__wrapper">
            <h1 className="vehicleDetails__heading">Edit Car Details</h1>
            <div className="vehicleDetails__container">
              <div className="vehicleDetails__subContainer">
                <h2 className="vehicleDetails__subHeading">Basic Details</h2>
                {/* <div className="vehicleDetails__column"> */}
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
                <ErrorMessage name="year" />

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
                <ErrorMessage name="make" />

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
                <ErrorMessage name="model" />

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
                <ErrorMessage name="trim" />

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
                <ErrorMessage name="vin" />

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
                <ErrorMessage name="price" />
                <div className="vehicleDetails__image">
                  {/* <h2 className="vehicleDetails__subHeading">Image </h2> */}
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
                        <ImageUploader
                          withIcon={false}
                          buttonText="Choose images"
                          onChange={(picture) =>
                            setFieldValue("images", picture)
                          }
                          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                          maxFileSize={5242880}
                        />
                        {values.images.length > 0
                          ? `${values.images.length} image selected`
                          : ""}
                        {touched[field.name] && errors[field.name] && (
                          <div className="error">{errors[field.name]}</div>
                        )}
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
                      as="select"
                      id="dealerName"
                      name="dealerName"
                      placeholder="Dealership List"
                    >
                      {dealerList.map(({ dealerId, dealerName }) => {
                        console.log("getting dealer", dealerName);
                        return (
                          <option key={dealerId} value={dealerName}>
                            {dealerName}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage name="dealerName" />
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
                <ErrorMessage name="details.engine" />

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
                <ErrorMessage name="details.driveTrain" />

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
                <ErrorMessage name="details.transmission" />

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
                <ErrorMessage name="details.exterior" />

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
                <ErrorMessage name="details.interior" />

                <h2 className="vehicleDetails__subHeading">Features</h2>
                <FieldArray
                  className="vehicleDetails__field"
                  type="text"
                  id="features"
                  name="features"
                  placeholder=""
                >
                  {(fieldArrayProps) => {
                    console.log("fieldArrayProps", fieldArrayProps);
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
                            <ErrorMessage name="features" />
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <ErrorMessage name="features" />
              </div>
            </div>
          </div>
          <div className="vehicleDetails__btnWrapper">
            <Button className="vehicleDetails__btn" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditVehicleDetails;
