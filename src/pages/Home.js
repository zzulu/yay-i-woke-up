import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WakeButton from 'components/WakeButton';
import SignIn from 'components/SignIn';
import SignOut from 'components/SignOut';
import { DataConsumer } from 'contexts/Data';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      woke: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const d = new Date();
    const mm = d.getMonth() < 10 ? `0${d.getMonth()+1}` : `${d.getMonth()+1}`
    const dd = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`
    const todayToString = `${d.getFullYear()}-${mm}-${dd}`;
    if(!nextProps.currentUser.loading && nextProps.histories) {
      if(nextProps.histories[todayToString] && nextProps.histories[todayToString].filter((h)=>{ return h.key === nextProps.currentUser.uid; }).length > 0) {
        return {
          woke: true
        };
      }
    }

    return null;
  }

  handleClick = () => {
    const n = Date.now(); const d = new Date(n);
    const mm = d.getMonth() < 10 ? `0${d.getMonth()+1}` : `${d.getMonth()+1}`
    const dd = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`
    const todayToString = `${d.getFullYear()}-${mm}-${dd}`;
    const histories = { ...this.props.histories };
    histories[todayToString] = [{ key: this.props.currentUser.uid, name: this.props.currentUser.name, wokeUpTime: n }, ...(histories[todayToString] || []) ];
    this.props.setHistory(histories);
  }

  renderWakeButton = (loading, uid, histories) => {
    if(loading || !histories) {
      return(
        <p>Loading...</p>
      );
    }

    if(!uid) {
      return (
        <div>
          <SignIn signIn={this.props.signIn} />          
        </div>
      );
    }

    return (
      <div>
        <div>
          <WakeButton woke={this.state.woke} handleClick={this.handleClick} name={this.state.name}/>        
        </div>
        <div>
          <SignOut signOut={this.props.signOut} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="home">
        <h1>Home</h1>
        {this.renderWakeButton(this.props.currentUser.loading, this.props.currentUser.uid, this.props.histories)}
      </div>
    );
  }
}

Home.propTypes = {
  currentUser: PropTypes.object,
  histories: PropTypes.object,
  setHistory: PropTypes.func,
  signIn: PropTypes.func,
  signOut: PropTypes.func
}

const HomeContainer = () => (
  <DataConsumer>
    {
      ({state, actions}) => (
        <Home 
          currentUser={state.currentUser}
          histories={state.histories}
          setHistory={actions.setHistory}
          signIn={actions.signIn}
          signOut={actions.signOut}
        />
      )
    }
  </DataConsumer>
)

export default HomeContainer;
