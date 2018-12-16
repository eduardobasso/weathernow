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
        <section class="main-content">
          <h2 hidden>Main cities</h2>
          <div className="boxes-container">
            <Card
              location="Nuuk, GL"
              temperature={-4}
              lastUpdate="02:48:32 PM"
            />
            <Card
              location="Urubici, BR"
              temperature={19}
              lastUpdate="02:48:27 PM"
              humidity={75}
              pressure={892}
            />
            <Card
              location="Nairobi, KE"
              temperature={31}
              lastUpdate="02:48:30 PM"
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;