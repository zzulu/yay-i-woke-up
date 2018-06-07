import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return(
      <nav>
        <Link to="/">Home</Link> | <Link to="/history">History</Link>
      </nav>
    );
  }
}

export default Navbar;
