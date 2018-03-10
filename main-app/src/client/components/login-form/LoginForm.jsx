import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import styles from './login-form.scss';

const mapStateToProps = state => ({
  user: state.user,
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.state = {
      loginMessage: '',
    };
  }

  onLoginSubmit(event) {
    event.preventDefault();
    const login = this.login.value;
    const password = this.password.value;

    this.props.manualLogin({ login, password })
      .then((loginMessage) => {
        if (loginMessage) {
          this.setState({
            loginMessage,
          });
        } else {
          this.setState({
            loginMessage: '',
          });
        }
      });

    this.login.value = '';
    this.password.value = '';
  }

  render() {
    return (
      <form className={styles.login_form}>
        <h4 className="text-center">Log in with your account</h4>
        <label htmlFor="login">
          Login
          <input
            type="text"
            ref={(input) => { this.login = input; }}
            placeholder="Your login"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            autoComplete="current-password"
            ref={(input) => { this.password = input; }}
            placeholder="Password"
          />
        </label>
        { this.state.loginMessage ? <div className={styles.message}>{this.state.loginMessage}</div> : '' }
        <p>
          <input
            type="submit"
            className="button expanded"
            value="Log in"
            onClick={this.onLoginSubmit}
          />
        </p>
      </form>);
  }
}

export default connect(mapStateToProps, authActions)(LoginForm);
