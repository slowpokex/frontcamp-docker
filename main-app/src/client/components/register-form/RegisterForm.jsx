import React, { Component } from 'react';
import { random, isEqual, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import styles from './register-form.scss';

const mapStateToProps = state => ({
  user: state.user,
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.state = {
      message: '',
    };
  }

  onRegisterSubmit(event) {
    event.preventDefault();
    const id = random(0, Number.MAX_SAFE_INTEGER);
    const login = this.login.value;
    const email = this.email.value;
    const displayName = this.displayName.value;
    const password = this.password.value;
    const rePassword = this.rePassword.value;

    if (isEmpty(login)) {
      return this.setState({
        message: 'Login is empty',
      });
    }

    if (login.length < 6) {
      return this.setState({
        message: 'Login is less than 6 symbols',
      });
    }

    if (isEmpty(password) || isEmpty(rePassword)) {
      return this.setState({
        message: 'Password is empty',
      });
    }

    if (password.length < 6 || rePassword.length < 6) {
      return this.setState({
        message: 'Password is less than 6 symbols',
      });
    }

    if (!isEqual(password, rePassword)) {
      return this.setState({
        message: 'Password isn\'t same',
      });
    }

    this.props.register({
      _id: id,
      login,
      displayName,
      email,
      password,
    })
      .then((message) => {
        if (message) {
          this.setState({
            message,
          });
        } else {
          this.setState({
            message: '',
          });
        }
      });

    this.password.value = '';
    this.rePassword.value = '';
  }

  render() {
    return (
      <form className={styles.register_form}>
        <h4 className="text-center">Please register</h4>
        <label htmlFor="login">
          Login (*)
          <input
            required
            minLength={6}
            autoComplete="username"
            type="text"
            ref={(input) => { this.login = input; }}
            placeholder="Your login"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            autoComplete="email"
            ref={(input) => { this.email = input; }}
            placeholder="Your email"
          />
        </label>
        <label htmlFor="displayName">
          Display Name
          <input
            type="text"
            ref={(input) => { this.displayName = input; }}
            placeholder="Your name"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            required
            minLength={6}
            type="password"
            autoComplete="current-password"
            ref={(input) => { this.password = input; }}
            placeholder="Password"
          />
        </label>
        <label htmlFor="re_password">
          Confirm password
          <input
            required
            minLength={6}
            type="password"
            autoComplete="current-password"
            ref={(input) => { this.rePassword = input; }}
            placeholder="Password"
          />
        </label>
        {this.state.message ? <div className={styles.message}>{this.state.message}</div> : '' }
        <p>
          <input
            type="submit"
            className="button expanded"
            value="Register"
            onClick={this.onRegisterSubmit}
          />
        </p>
      </form>);
  }
}

export default connect(mapStateToProps, authActions)(RegisterForm);
