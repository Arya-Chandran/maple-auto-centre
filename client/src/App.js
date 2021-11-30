import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import InventoryPage from "./pages/InventoryPage";
import VehiclePage from "./pages/VehiclePage";
import EditVehicleDetails from "./components/EditVehicleDetails";
import AddVehicle from "./components/AddVehicle";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={InventoryPage} />
            <Route path="/vehicle/:vin" exact component={VehiclePage} />
            <Route path="/inventory/add/" exact component={AddVehicle} />
            <Route path="/vehicle/edit/:vin/"  component={EditVehicleDetails} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
