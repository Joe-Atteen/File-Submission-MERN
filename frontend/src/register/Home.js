import React from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

function Home() {
  const Logout = () => {
    localStorage.clear();
  };

  return (
    <div className="home">
      <div className="nav">
        <h1>SUBMIT</h1>
        <Link className="logout" to="/" onClick={Logout}>
          Logout
        </Link>
      </div>
      <div className="hor-line"></div>
      <Modal />
    </div>
  );
}

export default Home;
