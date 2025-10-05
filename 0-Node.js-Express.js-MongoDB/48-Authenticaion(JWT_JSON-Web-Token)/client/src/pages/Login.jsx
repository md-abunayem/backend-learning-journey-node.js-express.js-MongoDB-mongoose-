import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // e.preventDefault();
    axios
      .post("http://localhost:3000/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("User Logged In Successfully", res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        console.log("Error while logging in", err);
        navigate("/login");
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
