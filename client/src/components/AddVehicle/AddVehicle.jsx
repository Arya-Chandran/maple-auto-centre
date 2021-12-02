import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import ImageUploader from "react-images-upload";

const host = "http://localhost:8080";

const onSubmit = (props, dealerList, values) => {
  console.log("values", values);
  console.log("props", props);

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
    .post(`http://localhost:8080/inventory`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      props.history.push("/", {});
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

function AddVehicle(props) {
  const [dealerList, setDealer] = useState([]);

   console.log("dealerList", dealerList);

  useEffect(() => {
     getDropdownList("dealership");
  }, []);

  const initialValues = {
    year: "",
    make: "",
    model: "",
    trim: "",
    vin: "",
    dealerName: "",
    price: "",
    images: [],
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
        onSubmit(props, dealerList, values);
      }}
    >
      {({ values }) => (
        <Form>
          <h2>Car Details</h2>

          <label htmlFor="">Year</label>
          <Field
            className=""
            type="text"
            id="year"
            name="year"
            placeholder="Year"
          />
          <ErrorMessage name="year" />

          <label htmlFor="">Make</label>
          <Field
            className=""
            type="text"
            id="make"
            name="make"
            placeholder="Make"
          />
          <ErrorMessage name="make" />

          <label htmlFor="">Model</label>
          <Field
            className=""
            type="text"
            id="model"
            name="model"
            placeholder="Model"
          />
          <ErrorMessage name="model" />

          <label htmlFor="">Trim</label>
          <Field
            className=""
            type="text"
            id="trim"
            name="trim"
            placeholder="Trim"
          />
          <ErrorMessage name="trim" />

          <label htmlFor="">VIN</label>
          <Field
            className=""
            type="text"
            id="vin"
            name="vin"
            placeholder="Price"
          />
          <ErrorMessage name="vin" />

          <label htmlFor="">Price</label>
          <Field
            className=""
            type="text"
            id="price"
            name="price"
            placeholder="Price"
          />
          <ErrorMessage name="price" />

          <Field
            id="images"
            name="images"
            type="file"
            render={({ field, form: { setFieldValue, touched, errors } }) => (
              <div>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={(picture) => setFieldValue("images", picture)}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
                {values.images.length > 0
                  ? `${values.images.length} images selected`
                  : "Please select image"}
                {touched[field.name] && errors[field.name] && (
                  <div className="error">{errors[field.name]}</div>
                )}
              </div>
            )}
          />
          {dealerList.length > 0 && (
            <>
              <label htmlFor="">Dealership Name</label>
              <Field
                className=""
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

          <h2>Features</h2>

          <label htmlFor="">Features</label>
          <FieldArray
            className=""
            type="text"
            id="features"
            name="features"
            placeholder=""
          >
            {(fieldArrayProps) => {
              //   console.log('fieldArrayProps', fieldArrayProps)
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { features } = values;
              return (
                <div>
                  {features.map((feature, index) => (
                    <div key={index}>
                      <Field name={`features[${index}]`} />
                      <button type="button" onClick={() => push(feature)}>
                        {" "}
                        +{" "}
                      </button>
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          {" "}
                          -{" "}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
          <ErrorMessage name="features" />

          <h2> Additional Details</h2>

          <label htmlFor="">Engine</label>
          <Field
            className=""
            type="text"
            id="engine"
            name="details.engine"
            placeholder="Engine"
          />
          <ErrorMessage name="details.engine" />

          <label htmlFor="">DriveTrain</label>
          <Field
            className=""
            type="text"
            id="driveTrain"
            name="details.driveTrain"
            placeholder="DriveTrain"
          />
          <ErrorMessage name="details.driveTrain" />

          <label htmlFor="">Transmission</label>
          <Field
            className=""
            type="text"
            id="transmission"
            name="details.transmission"
            placeholder="Transmission"
          />
          <ErrorMessage name="details.transmission" />

          <label htmlFor="">Exterior</label>
          <Field
            className=""
            type="text"
            id="exterior"
            name="details.exterior"
            placeholder="Exterior color"
          />
          <ErrorMessage name="details.exterior" />

          <label htmlFor="">Interior</label>
          <Field
            className=""
            type="text"
            id="interior"
            name="details.interior"
            placeholder="Interior color"
          />
          <ErrorMessage name="details.interior" />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default AddVehicle;
