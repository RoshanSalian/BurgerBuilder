import React, { Component } from "react";
import { Route, Switch, Routes, BrowserRouter } from "react-router-dom";
import Layout from './components/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>  
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" exact element={<Orders />} />
            <Route path="/" element={<BurgerBuilder />} />
          </Routes>
        </Layout>
      </div>
    );
  }
}

export default App;
