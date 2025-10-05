import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        axios.post("http://localhost:3000/register", {
            username, email, password
        })
        .then(()=>{
            console.log("User Registered Successfully");
            navigate("/login")
        }).catch((err)=>{
            console.log("Error while registering the user", err);
            navigate("/")
        });
        e.preventDefault();
    }

  return (
    <form action="/register" method="POST" onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input type="text" value={username} name="username" placeholder="Enter your username" onChange={(e)=>{setUsername(e.target.value)}}/>
      </div>
      <div>
        <label>Email: </label>
        <input type="email" name="email" value={email} placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
      </div>
      <div>
        <label>Password: </label>
        <input type="password" name="password" value={password} placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}/>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
