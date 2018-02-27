import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configure-store'
import './index.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore(window.PRELOADED_STATE)
delete window.PRELOADED_STATE

const ReduxReactApp = (props) => (
  <Provider store={ props.store }>
    <App></App>
  </Provider>
)

ReactDOM.hydrate((<ReduxReactApp store={store} />), document.getElementById('root'))
registerServiceWorker()
