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
    this.state = { location: props.searchQuery.split(",").join(", "), loaded: false, error: false };
    this.getData = this.getData.bind(this);
  }

  kelvinToCelsius(t) {
    const k = 273.15;
    return (t - k);
  }

  getData() {
    this.setState({
      loaded: false,
      error: false
    });
    fetch(`${API_URL}?q=${this.props.searchQuery}&APPID=${ACCOUNT_APPID}`).then(response => response.json()).then((result) => {
      try {
        this.setState({
          location: `${result.name}, ${result.sys.country}`,
          temperature: Math.round(this.kelvinToCelsius(result.main.temp)),
          humidity: Math.round(result.main.humidity),
          pressure: Math.round(result.main.pressure),
          lastUpdate: new Date(),
          loaded: true
        });
      } catch {
        this.setState({
          loaded: true,
          error: true
        });
      }
    }, (error) => {
      this.setState({
        loaded: true,
        error: true
      });
    });
  }

  componentDidMount() {
    this.getData();
    this.inverval = setInterval(() => (this.getData()), (60 * REQUEST_INTERVAL_MINUTES * 1000));
  }

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  render() {
    const Body = () => {
      let displayClass = "display";
      if (this.state.temperature > 25) {
        displayClass += " hot";
      } else if (this.state.temperature < 5) {
        displayClass += " cold";
      }

      if (this.state.loaded) {
        if (this.state.error) {
          return (
            <div className="card-body overlay">
              <div className="error">
                <p>Something went wrong</p>
                <button type="button" onClick={this.getData}>Try again</button>
              </div>
            </div>
          );
        } else {
          return (
            <div className="card-body">
              <span className={displayClass}>{this.state.temperature}<small aria-label="Degrees Celsius">˚</small></span>
            </div>
          );
        }
      } else {
        return (
          <div className="card-body overlay">
            <img src={loader} alt="Loading icon" width="56" height="56" />
          </div>
        );
      }
    };

    const Footer = () => {
      const Details = () => {
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
      };
      
      if (this.state.loaded && ! this.state.error) {
        return (
          <footer className="card-footer">
            <Details />
            <p>Updated at <Moment format={DATE_FORMAT}>{this.state.lastUpdate}</Moment></p>
          </footer>
        );
      } else {
        return null;
      }
    };

    return (
      <article className="card">
        <header className="card-header">
          <h3>{this.state.location}</h3>
        </header>
        <Body />
        <Footer />
      </article>
    );
  }
}

export default Card;