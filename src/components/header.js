import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Error Reporting
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <NavLink to="/" activeClassName="active" className="nav-item nav-link">
              Clients
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
