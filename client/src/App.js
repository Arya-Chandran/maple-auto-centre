import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import InventoryPage from './pages/InventoryPage';



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <InventoryPage/>
   
      </div>
    );
  }
}

export default App;

