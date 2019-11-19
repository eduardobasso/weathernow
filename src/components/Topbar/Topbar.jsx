import React, { Component } from 'react';

import "./Topbar.scss";

import Logo from "../../assets/img/logo.svg";

class Topbar extends Component {
  render() {
    return (
      <div className="top-header">
        <img src={Logo} alt="Weather Now logo" width="162" height="24" />
      </div>
    );
  }
}

export default Topbar;