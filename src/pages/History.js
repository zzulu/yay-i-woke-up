import React, { Component } from 'react';
import { DataConsumer } from 'contexts/Data';

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.histories) {
      return { loading: false }
    }

    return null;
  }

  renderHistories = (loading, histories) => {
    if(loading) {
      return(
        <p>Loading...</p>
      );
    }

    return(
      <div>
        {Object.keys(histories).reverse().map((date)=>(
          <div key={date}>
            <h3>{date}</h3>
            <ul>
              {Object.keys(histories[date]).map((uid)=>(
                <li key={uid}>
                  <b>{histories[date][uid].name}</b> woke up at {new Date(histories[date][uid].wokeUpTime).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        ))}        
      </div>
    );
  }

  render() {
    return(
      <div>
        <h1>History</h1>
        {this.renderHistories(this.state.loading, this.props.histories)}
      </div>
    );
  }
}

const HistoryContainer = () => (
  <DataConsumer>
    {
      ({state, actions}) => (
        <History 
          currentUser={state.currentUser}
          histories={state.histories}
        />
      )
    }
  </DataConsumer>
)

export default HistoryContainer;
