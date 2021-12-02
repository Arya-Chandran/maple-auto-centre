import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import InventoryPage from "./pages/InventoryPage";
import VehiclePage from "./pages/VehiclePage";
import EditVehicleDetails from "./components/EditVehicleDetails";
import AddVehicle from "./components/AddVehicle";
import ContactForm from "./components/ContactForm";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={InventoryPage} />
            <Route path="/vehicle/:vin" exact component={VehiclePage} />
            <Route path="/inventory/"  component={AddVehicle} />
            <Route path="/vehicle/edit/:vin/"  component={EditVehicleDetails} />
            <Route path="/form/" exact component={ContactForm} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
