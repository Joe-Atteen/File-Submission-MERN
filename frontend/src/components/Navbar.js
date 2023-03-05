import React from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>
        Subm<span>i</span>t
      </h2>
      <div>
        <Link to="/login" id="login" className="button">
          Login
        </Link>
        <Link to="/signup" id="sign-up" className="button">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
