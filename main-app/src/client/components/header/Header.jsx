import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import * as authActions from '../../actions/authActions'
import styles from './header.scss'

const mapStateToProps = (state) => ({
  user: state.user
})

class Header extends Component {
  constructor () {
    super()
    this.logoutEvent = this.logoutEvent.bind(this)
    this.renderIsAuth = this.renderIsAuth.bind(this)
    this.state = {
      loginMessage: ''
    }
  }

  logoutEvent (event) {
    event.preventDefault()
    this.props.manualLogout()
  }

  renderIsAuth ({ authenticated, login = 'Anonymous' }) {
    if (!authenticated) {
      return ''
    } else {
      return (
        <div className={ styles.header_font }>
          <div className={ styles.user_name }>
            Hello, { login + ' ' }
          </div>          
          <button onClick={ this.logoutEvent }>Logout</button>
        </div>
      )
    }
  }

  render () {
    return (
      <header className={ styles.header }>
        <div className={ styles.header_logo }>
          <a href="#">Frontcamp</a>
        </div>
        { this.renderIsAuth(this.props.user) }
      </header>
    )
  }
}

export default connect(mapStateToProps, authActions)(Header)
