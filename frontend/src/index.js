import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import isNode from 'detect-node';
import logger from 'redux-logger';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

let middlewares = [		
	thunkMiddleware
];

if (!isNode) {
	middlewares.push(logger);
}

const finalCreateStore = applyMiddleware(...middlewares)(createStore);
const store = finalCreateStore(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const ReduxReactApp = (props) => (
    <Provider store={ props.store }>
      <App></App>
    </Provider>
);

ReactDOM.render(<ReduxReactApp store={store} />, document.getElementById('root'));
registerServiceWorker();
