import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import loader from './loader.svg';
import './Card.css';

const REQUEST_INTERVAL_MINUTES = 10;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const ACCOUNT_APPID = "87be0f03d77bdbe5bba92410c0f4d160";
const DATE_FORMAT = "hh:mm:ss a";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { location: props.searchQuery.split(",").join(", "), loaded: false };
  }

  kelvinToCelsius(t) {
    const k = 273.15;
    return (t - k);
  }

  getData() {
    fetch(`${API_URL}?q=${this.props.searchQuery}&APPID=${ACCOUNT_APPID}`).then(response => response.json()).then((result) => {
      console.log(result);
      this.setState({
        location: `${result.name}, ${result.sys.country}`,
        temperature: Math.round(this.kelvinToCelsius(result.main.temp)),
        humidity: Math.round(result.main.humidity),
        pressure: Math.round(result.main.pressure),
        lastUpdate: new Date(),
        loaded: true
      });
    }, (error) => {
      console.log(error);
      this.setState({
        error,
        loaded: true
      });
    });
  }

  showDetails() {
    if (this.props.showDetails) {
      return (
        <div className="more-details">
          <div className="display">
            <dl>
              <dt>Humidity</dt>
              <dd>{this.state.humidity}<small aria-label="Percent">%</small></dd>
            </dl>
          </div>
          <div className="display">
            <dl>
              <dt>Pressure</dt>
              <dd>{this.state.pressure}<small aria-label="Hecto Pascal">hPa</small></dd>
            </dl>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.getData();
    this.inverval = setInterval(() => (this.getData()), (60 * REQUEST_INTERVAL_MINUTES * 1000));
  }

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  render() {
    let displayClass = "display";
    if (this.state.temperature > 25) {
      displayClass += " hot";
    } else if (this.state.temperature < 5) {
      displayClass += " cold";
    }

    return (
      <article className="card">
        <header className="card-header">
          <h3>{this.state.location}</h3>
        </header>
        <div className="card-body">
          <span className={displayClass}>{this.state.temperature}<small aria-label="Degrees Celsius">˚</small></span>
        </div>
        <footer className="card-footer">
          {this.showDetails()}
          <p>Updated at <Moment format={DATE_FORMAT}>{this.state.lastUpdate}</Moment></p>
        </footer>
      </article>
    );
  }
}

export default Card;