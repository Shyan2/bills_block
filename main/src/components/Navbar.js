import React, { Component } from "react";
import Identicon from "identicon.js";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    const navStyle = {
      color: "white",
    };

    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">
          Bill of Quantities
        </a>
        <ul className="nav-links">
          {/* <Link style={navStyle} to="/TableTest">
            <li>Table test</li>
          </Link>
          <Link style={navStyle} to="/log">
            <li>Log</li>
          </Link> */}
          <Link style={navStyle} to="/bill">
            <li>Bill</li>
          </Link>
          {/* <Link style={navStyle} to="/gettest">
            <li>GET TEST</li>
          </Link> */}
          {/* <Link style={navStyle} to="/userform">
            <li>User Form</li>
          </Link> */}
        </ul>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            {this.props.account ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                src={`data:image/png;base64, ${new Identicon(
                  this.props.account,
                  30
                ).toString()}`}
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
