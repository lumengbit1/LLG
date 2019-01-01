import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Routes from "./routes";

import "./css/custom-font.css";
import "./css/bootstrap.css";
import "./css/circle.css";
import "./css/style.css";
import "./css/responsive.css";
import "./css/maintenance.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
