import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  address: "",
  postalCode: "",
  phoneNumber: "",
  email: "",
};
const onSubmit = (values) => {
  console.log("values", values);
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
});

function ContactForm(props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => onSubmit()}
    >
      <Form>
              <label htmlFor="">First name</label>
              <Field className="" type="text" id="firstName" name="firstName"/>
              <ErrorMessage name ='firstName'/>

              <label htmlFor="">Last Name</label>
              <Field className="" type="text" id="lastName" name="lastName" />
              <ErrorMessage name ='lastName'/>

              <label htmlFor="">Street Address</label>
              <Field className="" type="text" id="address" name="address" />
              <ErrorMessage name ='address'/>

              <label htmlFor="">Postal Code</label>
              <Field className="" type="text" id="postalCode" name="tpostalCoderim" />
              <ErrorMessage name ='postalCode'/>

              <label htmlFor="">Phone Number</label>
              <Field className="" type="text" id="phoneNumber" name="phoneNumber" />
              <ErrorMessage name ='phoneNumber'/>

              <label htmlFor="">Email</label>
              <Field className="" type="text" id="email" name="email" />
              <ErrorMessage name ='email'/>
          
      </Form>
    </Formik>
  );
}

export default ContactForm;
