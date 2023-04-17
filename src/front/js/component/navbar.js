import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  //<a href="./demo.html">
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home </span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/todo">
            <button className="btn btn-success">
              Check LesCampos ToDoList
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
