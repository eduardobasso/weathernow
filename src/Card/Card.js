import React, { Component } from 'react';
import loader from './loader.svg';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { 'shownDetails': props.humidity && props.pressure };
  }

  showDetails() {
    if (this.state.shownDetails) {
      return (
        <div class="more-details">
          <div class="display">
            <dl>
              <dt>Humidity</dt>
              <dd>{this.props.humidity}<small aria-label="Percent">%</small></dd>
            </dl>
          </div>
          <div class="display">
            <dl>
              <dt>Pressure</dt>
              <dd>{this.props.pressure}<small aria-label="Hecto Pascal">hPa</small></dd>
            </dl>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    let displayClass = "display";
    if (this.props.temperature > 25) {
      displayClass += " hot";
    } else if (this.props.temperature < 5) {
      displayClass += " cold";
    }

    return (
      <article className="card">
        <header className="card-header">
          <h3>{this.props.location}</h3>
        </header>
        <div className="card-body">
          <span className={displayClass}>{this.props.temperature}<small aria-label="Degrees Celsius">˚</small></span>
        </div>
        <footer className="card-footer">
          {this.showDetails()}
          <p>Updated at {this.props.lastUpdate}</p>
        </footer>
      </article>
    );
  }
}

export default Card;