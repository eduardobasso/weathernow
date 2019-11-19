import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import Axios from 'axios';

import { WEATHER } from "../../data/endpoints";

import "./Card.scss";

import Loader from "../../assets/img/loader.svg";

const REQUEST_INTERVAL_MINUTES = 10;
const DATE_FORMAT = "hh:mm:ss a";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: props.searchQuery.split(",").join(", "),
      temperature: null,
      humidity: null,
      pressure: null,
      lastUpdate: null,
      loaded: false,
      error: false
    };
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

    Axios.get(WEATHER, {
      params: {
        q: this.props.searchQuery,
        APPID: process.env.ACCOUNT_APPID
      }
    }).then(response => {
      if (response.status === 200) {
        const { name, sys: { country }, main: { temp, humidity, pressure } } = response.data;
        
        this.setState({
          location: `${name}, ${country}`,
          temperature: Math.round(this.kelvinToCelsius(temp)),
          humidity: Math.round(humidity),
          pressure: Math.round(pressure),
          lastUpdate: new Date(),
          loaded: true
        });
      } else {
        this.setState({
          loaded: true,
          error: true
        });
      }
    }).catch(() => {
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
    const { location, temperature, humidity, pressure, lastUpdate, loaded, error } = this.state;
    const Body = () => {
      let displayClass = "display";
      if (temperature > 25) {
        displayClass += " hot";
      } else if (temperature <= 5) {
        displayClass += " cold";
      }

      if (loaded) {
        if (error) {
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
              <span className={displayClass}>{temperature}<small aria-label="Degrees Celsius">˚</small></span>
            </div>
          );
        }
      } else {
        return (
          <div className="card-body overlay">
            <img src={Loader} alt="Loading icon" width="56" height="56" />
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
                  <dd>{humidity}<small aria-label="Percent">%</small></dd>
                </dl>
              </div>
              <div className="display">
                <dl>
                  <dt>Pressure</dt>
                  <dd>{pressure}<small aria-label="Hecto Pascal">hPa</small></dd>
                </dl>
              </div>
            </div>
          );
        } else {
          return null;
        }
      };
      
      if (loaded && ! error) {
        return (
          <footer className="card-footer">
            <Details />
            <p>Updated at <Moment format={DATE_FORMAT}>{lastUpdate}</Moment></p>
          </footer>
        );
      } else {
        return null;
      }
    };

    return (
      <article className="card">
        <header className="card-header">
          <h3>{location}</h3>
        </header>
        <Body />
        <Footer />
      </article>
    );
  }
}

export default Card;