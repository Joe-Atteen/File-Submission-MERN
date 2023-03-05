import React from "react";
import "../css/landingpage.css";
import submitimg from "../images/submit.jpg";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landingpage">
      <Navbar />
      <div className="text">
        <h1>Welcome to Submit.</h1>
        <p>
          This is a file submission platform. Submit class exercises and
          assignments without hustle.
        </p>
        <Link to="/login" className="gs">
          Get Started
        </Link>
      </div>
      <div className="image">
        <img src={submitimg} alt="" />
      </div>
    </div>
  );
}

export default LandingPage;
