import React, { Component, Fragment } from 'react';

import "./Main.scss";

import Topbar from "../Topbar/Topbar.jsx";
import Card from "../Card/Card.jsx";

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Topbar />
        <section className="main-content">
          <h2 hidden>Main cities</h2>
          <div className="boxes-container">
            <Card searchQuery="Nuuk,GL" />
            <Card searchQuery="Urubici,BR" showDetails />
            <Card searchQuery="Nairobi,KE" />
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Main;