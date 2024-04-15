import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a GET request to retrieve user information by sending email and password as query parameters
      const response = await axios.get(`http://localhost:8080/userlogin`, {
        params: {
          email: email,
          password: password,
        },
      });

      // Check if the response is valid
      if (response.data && response.data.id) {

        if (response.data.admin === "true") {
          navigate("/home");
        } else {
        // Navigate to a different component with the obtained ID
          navigate(`/dashboard/${response.data.id}`);
        }
      }
    } catch (error) {
        navigate("/loginFail");
      // Handle the error (e.g., show an error message to the user)
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Login</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Login
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
