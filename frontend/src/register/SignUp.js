import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        "https://submit-ettu.onrender.com/signup",
        {
          username,
          email,
          password,
        }
      );

      console.log(data);

      if (data.message && data.message !== "Sign up successful") {
        alert("All fields must be filled!");
        navigate("/signup");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup">
      <h2>Create An Account</h2>
      <form action="" method="">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
