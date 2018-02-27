import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appReducers from '../reducers'
import isNode from 'detect-node'
import logger from 'redux-logger'

export default function (initialState = {}) {
  let middlewares = [
    thunk
  ]

  if (!isNode) {
    middlewares.push(logger)
  }

  const finalCreateStore =
    applyMiddleware(...middlewares)(createStore, initialState)
  const store = finalCreateStore(appReducers)

  return store
}
