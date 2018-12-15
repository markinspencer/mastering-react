import { Component } from "react";
import { logout } from "../../services/auth.service";

class Logout extends Component {
  componentDidMount = () => {
    logout();
    window.location = "/";
  };

  render = () => null;
}

export default Logout;
