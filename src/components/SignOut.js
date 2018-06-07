import React, { Component } from 'react';
import PropTypes from 'prop-types'

class SignOut extends Component {
  render() {
    return(
      <React.Fragment>
        <button className="btn btn-facebook" onClick={this.props.signOut}>Sign out</button>
      </React.Fragment>
    );
  }
}

SignOut.propTypes = {
  authenticate: PropTypes.func
}

export default SignOut;
