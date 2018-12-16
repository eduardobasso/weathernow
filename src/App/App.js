import React, { Component } from 'react';
import './App.css';
import Topbar from '../Topbar/Topbar';
import Card from '../Card/Card';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 hidden>Weather Now</h1>
        <Topbar />
        <section className="main-content">
          <h2 hidden>Main cities</h2>
          <div className="boxes-container">
            <Card
              searchQuery="Nuuk,GL"
              loading={true}
            />
            <Card
              searchQuery="Urubici,BR"
              showDetails={true}
            />
            <Card
              searchQuery="Nairobi,KE"
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;