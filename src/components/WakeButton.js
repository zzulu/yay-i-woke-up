import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  renderButton(woke) {
    if(woke) {
      return(
        <button className="btn btn-woke">Yay, I woke up!</button>
      );
    }

    return(
      <button className="btn btn-wake" onClick={this.props.handleClick}>Did you wake up?</button>
    );
  }

  render() {
    return(
      <React.Fragment>
        {this.renderButton(this.props.woke)}
      </React.Fragment>
    );
  }
}

Button.propTypes = {
  woke: PropTypes.bool,
  handleClick: PropTypes.func
}

export default Button;
