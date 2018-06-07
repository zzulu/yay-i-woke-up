import React, { Component } from 'react';
import PropTypes from 'prop-types'

class SignIn extends Component {
  render() {
    return(
      <React.Fragment>
        <button className="btn btn-facebook" onClick={this.props.signIn}>Sign in with Facebook</button>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  authenticate: PropTypes.func
}

export default SignIn;
