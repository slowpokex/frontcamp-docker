import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configure-store';
import './index.css';

import App from './App';

// Need for window manipulation
/* eslint no-undef: "warn" */
const store = configureStore(window.PRELOADED_STATE);
delete window.PRELOADED_STATE;

const ReduxReactApp = props => (
  <Provider store={props.store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.hydrate((<ReduxReactApp store={store} />), document.getElementById('root'));
