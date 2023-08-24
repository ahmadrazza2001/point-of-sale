import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { BiCart } from "react-icons/bi";
import "./nav.css";

const LayoutApp = ({ children }) => {
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      {loading && <Spinner />}
      <nav className="navbar">
        <div className="menu-icon" onClick={toggleNav}>
          ☰
        </div>
        <ul className={`nav-links ${isNavVisible ? "active" : ""}`}>
          <li className="menuBtn">
            <Link to="/">Home</Link>
          </li>
          <li className="menuBtn">
            <Link to="/products">All Products</Link>
          </li>
          <li className="menuBtn">
            <Link to="/bills">All Bills</Link>
          </li>
          <li className="menuBtn">
            <Link to="/customers">Customers</Link>
          </li>
          <li
            className="logoutBTN"
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            Logout
          </li>
        </ul>
        <div className="cart-items" onClick={() => navigate("/cart")}>
          <BiCart />
          <small
            style={{
              fontSize: "15px",
              background: "orange",
              padding: "0 5px",
              margin: "0px",
              borderRadius: "50%",
            }}
          >
            {cartItems.length}
          </small>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default LayoutApp;
