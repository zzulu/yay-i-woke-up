import React, { Component, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import base, { firebaseApp } from '../base';

const Context = createContext();

const { Provider, Consumer: DataConsumer } = Context; 

class DataProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        loading: true,
        uid: null,
        name: null
      },
      histories: null
    }
  }

  handleAuth = (authData) => {
    this.setState({
      currentUser: {
        loading: false,
        uid: authData.user.uid,
        name: authData.user.displayName
      }
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.handleAuth({ user })
      } else {
        this.setState({ currentUser: { ...this.state.currentUser, loading: false }})        
      }
    })

    this.ref = base.syncState('histories', {
      context: this,
      state: 'histories'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  actions = {
    setCurrentUser: (currentUser) => {
      this.setState({ currentUser });
    },
    setHistory: (histories) => {
      this.setState({ histories });
    },
    signIn: () => {
      const authProvider = new firebase.auth.FacebookAuthProvider();
      firebaseApp.auth().signInWithPopup(authProvider).then(this.handleAuth);
    },
    signOut: async () => {
      await firebase.auth().signOut();
      this.setState({ currentUser: { uid: null, name: null }});
    }
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

export {
  DataProvider,
  DataConsumer,
};
