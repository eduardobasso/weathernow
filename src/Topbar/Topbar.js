import React, { Component } from 'react';
import logo from './logo.svg';
import './Topbar.css';

class Topbar extends Component {
  render() {
    return (
      <div className="top-header">
        <img src={logo} alt="Weather Now logo" width="162" height="24" />
      </div>
    );
  }
}

export default Topbar;