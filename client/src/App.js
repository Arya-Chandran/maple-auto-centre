import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import InventoryPage from "./pages/InventoryPage";
import VehiclePage from "./pages/VehiclePage";
import EditVehicleDetails from "./components/EditVehicleDetails";
import AddVehicle from "./components/AddVehicle";
import ContactForm from "./components/ContactForm";
import Register from "./components/Modals/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

const PrivateRoute = (props) => {
  return props.isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoggedIn: false,
    profileData: null,
    isAuthencating: true,
  };
  componentDidMount() {
    const authToken = sessionStorage.getItem("clientAuthToken");
    if (authToken) {
      this.fetchProfile(authToken);
    } else {
      this.setState({
        isAuthencating: false,
      });
    }
  }

  fetchProfile = (token) => {
    axios
      .get("http://localhost:8080/profile", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({
          profileData: response.data,
          isLoggedIn: true,
          isAuthencating: false,
        });
        console.log("Found user");
      })
      .catch((err) => {
        console.log("profile error", err);
        this.setState({
          isAuthencating: false,
        });
      });
  };

  setLoggedIn = (flag) => {
    console.log(this.props);
    this.setState({ isLoggedIn: flag });
    sessionStorage.setItem("isLoggedIn", flag);
    console.log("Login status:", this.state.isLoggedIn);
  };

  render() {
    const { isAuthencating, isLoggedIn } = this.state;
    return (
      <div className="App">
        {!isAuthencating && (
          <>
            <BrowserRouter>
              {isLoggedIn && (
                <Header
                  profileData={this.state.profileData}
                  setLoggedIn={this.setLoggedIn}
                />
              )}
              <Switch>
                <Route
                  path="/register"
                  exact
                  render={(props) => (
                    <Register
                      {...props}
                      isLoggedIn={this.state.isLoggedIn}
                      setLoggedIn={this.setLoggedIn}
                    />
                  )}
                />
                <Route
                  path="/login"
                  exact
                  render={(props) => (
                    <Login
                      {...props}
                      isLoggedIn={this.state.isLoggedIn}
                      setLoggedIn={this.setLoggedIn}
                      fetchProfile={this.fetchProfile}
                    />
                  )}
                />
                <PrivateRoute
                  isLoggedIn={this.state.isLoggedIn}
                  path="/"
                  exact
                  render={(props) => (
                    <InventoryPage
                      {...props}
                      profileData={this.state.profileData}
                    />
                  )}
                />
                <PrivateRoute
                  isLoggedIn={this.state.isLoggedIn}
                  path="/inventory"
                  exact
                  render={(props) => (
                    <InventoryPage
                      {...props}
                      profileData={this.state.profileData}
                    />
                  )}
                />
                <PrivateRoute
                  isLoggedIn={this.state.isLoggedIn}
                  path="/vehicle/:vin"
                  exact
                  component={VehiclePage}
                />
                <PrivateRoute
                  isLoggedIn={this.state.isLoggedIn}
                  path="/inventory/add"
                  component={AddVehicle}
                />
                <PrivateRoute
                  isLoggedIn={this.state.isLoggedIn}
                  path="/vehicle/edit/:vin/"
                  component={EditVehicleDetails}
                />
                <PrivateRoute
                  isLoggedIn={this.state.isLoggedIn}
                  path="/form/"
                  exact
                  component={ContactForm}
                />
              </Switch>
              {isLoggedIn && <Footer />}
            </BrowserRouter>
          </>
        )}
      </div>
    );
  }
}

export default App;
