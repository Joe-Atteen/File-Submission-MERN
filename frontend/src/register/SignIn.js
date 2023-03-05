import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3001/signin", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);

      console.log(data);

      if ("token" && data.token) {
        navigate("/home");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..Account could be found.",
          text: "Kindly sign up or try again!",
        });
      }
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="signin">
      <h2>Sign In</h2>
      <form action="" method="">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Login</button>
        <br />
        <p>OR</p>
        <br />
        <Link className="link" to="/signup">
          <span>Sign Up</span> if you do not have an account.
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
