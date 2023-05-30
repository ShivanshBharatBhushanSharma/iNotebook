import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            className="form-control"
            value={credentials.name}
            onChange={onChange}
            id="name"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="password"
            name="password"
            placeholder="Password"
            minLength={5}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={credentials.cpassword}
            onChange={onChange}
            id="cpassword"
            name="cpassword"
            placeholder="Password"
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
