import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import * as authActions from '../../actions/authActions'
import styles from './login-form.scss'

const mapStateToProps = (state) => ({
  user: state.user
})

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.onLoginSubmit = this.onLoginSubmit.bind(this)
    this.logoutEvent = this.logoutEvent.bind(this)
    this.state = {
      loginMessage: ''
    }
  }

  onLoginSubmit (event) {
    event.preventDefault()
    const login = ReactDOM.findDOMNode(this.refs.login).value
    const password = ReactDOM.findDOMNode(this.refs.password).value

    console.log(login, password)

    this.props.manualLogin({ login, password })
      .then(loginMessage => {
        if (loginMessage) {
          this.setState({
            loginMessage
          })
        } else {
          this.setState({
            loginMessage: ''
          })
        }
      })

    ReactDOM.findDOMNode(this.refs.login).value = ''
    ReactDOM.findDOMNode(this.refs.password).value = ''
  }

  logoutEvent (event) {
    event.preventDefault()
    this.props.manualLogout()
  }

  render () {
    return (
      <form className={styles.login_form}>
        <h4 className="text-center">Log in with your account</h4>
        <label>
          Login
          <input type="text" ref="login" placeholder="Your login"/>
        </label>
        <label>
          Password
          <input type="password" autoComplete="current-password" ref="password" placeholder="Password"/>
        </label>        
        { this.state.loginMessage ? <div className={styles.message}>{this.state.loginMessage}</div> : '' }
        <p>
          <input 
            type="submit"
            className="button expanded"
            value="Log in"
            onClick={this.onLoginSubmit}>
          </input>
        </p>
        <p className="text-center"><a href="#">Forgot your password?</a></p>
      </form>)
  }
}

export default connect(mapStateToProps, authActions)(LoginForm)
