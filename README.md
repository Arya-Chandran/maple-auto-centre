# Capstone Project

Project Title: Maple-Auto Centre

## Project Description
Maple-Auto Centre is a car dealership website with inventory management. 

Here customers can register and login into the website. Once logged in, they  can view a list of available cars as well as full vehicle information in different dealerships. Customers can also estimate the payment based on downpayment, annual percentage rate and frequency. Based on the user inputs, the website shows a detailed pricing summary. Apart from that, customers can fill out a form to contact the dealer through the dealer email.

Additionally, there is an admin account that maintains inventory. The admin can add, edit and delete vehicle from the inventory list.

### Functionality

1. Register

- Creating a new user.
- Check for existing customer.
- Validation to all fields in the register form. Check email format, confirm password. 


2. Login

- Registered user can login.
- Login authentication based on JWT token.
- Admin has special privileges for the CRUD operations (restricted route).
      Admin username: admin@gmail.com
      Password: admin1234

3. Main Page 

- The main page is inventory list.
- Header component showing logo, company name, user profile name and an option to logout.
- Mention total number of inventories available.
- Footer component contains links( to follow on facebook, instagram and twitter)

4. Vehicle Details Page

- Payment calculation and provides a pricing summary based on given inputs.
- Customer can contact dealer via email.

5. Admin
- Once logged in as admin, the admin can add, update and delete inventory details.



### Instructions to run project locally

1. Ensure you `cd` into both the client and server folders and run an npm install to get the appropriate node modules.
2. On the client side, run `npm start` in the Terminal.
3. On the server side, run node `npm start` in the Terminal.
4. Visit the usual `localhost` URL at port `3000` to browse the website(`http://localhost:3000`).

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### Libraries Used
Client: 
1. Formik & Yup - Validation for all forms are done through formik and yup.
2. Reactstrap 
     - Used button and model component to create all buttons and model windows.
     - Used input component to upload an image.
     - Used tooltip component to display informative text when users hover over.

3. React-icons- Used edit, delete and add icon from this library.
4. Axios - Handle API calls
5. emailjs - Used to send an email

Server:
1. JWT - To handle user authentication
2. express-fileupload - Used to store vehicle images.


## Tech used

Front-end: React.js and React hooks
Back-end: Node.js and mongoDB(database)


### Additional Comments

-  Website is responsive for different devices at all required breakpoints.
