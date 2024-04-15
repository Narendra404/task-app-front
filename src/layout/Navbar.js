import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "./github-logo.png";

const logoStyle = {
  width: "50px", // Set the width of the logo
  height: "50px", // Set the height of the logo
  marginRight: "10px", // Adjust the spacing between the logo and text
};

export default function Navbar1() {

  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            {pathname !== "/" && (
              <ul>
          <Link className="navbar-brand" to={pathname}>
            Task App
          </Link>
            </ul>
            )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {pathname === "/" && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                <a href="https://github.com/Narendra404">
                <img src={logoImage} alt="Logo" style={logoStyle} />
                </a>
              }
            </ul>
            )}
            {pathname === "/" && (
              <ul>
            <Link className="btn btn-outline-light" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-light" to="/adduser">
              Sign Up
            </Link>
            </ul>
            )}
            {pathname !== "/" && pathname !== "/login" && pathname !== "/adduser" && (
              <ul>
            <Link className="btn btn-danger mx-2 " to="/">
              Log out
              </Link>
            </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
