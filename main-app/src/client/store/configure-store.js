import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import isNode from 'detect-node';
import logger from 'redux-logger';

import appReducers from '../reducers';

export default function (initialState = {}) {
  const middlewares = [
    thunk,
  ];

  if (!isNode) {
    middlewares.push(logger);
  }

  const finalCreateStore =
    applyMiddleware(...middlewares)(createStore, initialState);
  const store = finalCreateStore(appReducers);

  return store;
}
