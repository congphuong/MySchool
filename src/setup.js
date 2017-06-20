import React, { Component } from 'react';
import { Text, AppState, AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

//import logger from "redux-logger";
import reducers from './reduces';

const middleware = [thunk];


const stores = createStore(reducers, applyMiddleware(...middleware));

  class Root extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isStoreLoading: false,
        store: stores
      };
    }

    componentWillMount() {
      const self = this;
      AppState.addEventListener('change', this.handleAppStateChange.bind(this));
      this.setState({ isStoreLoading: true });
      AsyncStorage.getItem('completeStore').then((value) => {
        if (value && value.length) {
          const initialStore = JSON.parse(value);
          self.setState({ store: createStore(reducers, initialStore, applyMiddleware(...middleware)) });
        } else {
          self.setState({ store: stores });
        }
        self.setState({ isStoreLoading: false });
      }).catch((error) => {
        self.setState({ store: stores });
        self.setState({ isStoreLoading: false });
        console.log('store', error);
      });
    }
    componentWillUnmount() {
      AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
    }
    handleAppStateChange(currentAppState) {
      const storingValue = JSON.stringify(this.state.store.getState());
      AsyncStorage.setItem('completeStore', storingValue);
    }

    render() {
      console.log('heare');
      if (this.state.isStoreLoading) {
        return <Text>Loading Store ...</Text>;
      } else {
        return (
          <Provider store={this.state.store}>
            <App />
          </Provider>
        );
      }
    }
  }

module.exports = Root;
