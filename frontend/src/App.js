import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import ProductList from "./productList/ProductList";
//import Checkout from "./checkout/Checkout.js";
//import History from "./history/History.js";
import Homepage from "./pages/HomePage";
import Itempage from "./pages/ItemPage";

function App() {
  ReactDOM.render(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/items" element={<Itempage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
