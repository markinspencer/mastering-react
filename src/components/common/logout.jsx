import React, { Component } from "react";

class Logout extends Component {
  componentDidMount = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  render = () => null;
}

export default Logout;
