import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import History from 'pages/History';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/history" component={History}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// <Route exact path="/" render={(props)=>(<Home currentUser={this.props.currentUser}/>)} /> 이런식으로 <Route/>에 props 넘길 수 있음.
