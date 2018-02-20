import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
    Navbar,
    NavbarBrand,
    Alert,
    Form,
    FormGroup,
    Label,
    Input, 
    Button
  } from 'reactstrap';

import * as authActions from '../../actions/authActions';
import './header.css';

const mapStateToProps = (state) => ({
  user: state.user
});

class Auth extends Component {
    constructor() {
        super();
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.logoutEvent = this.logoutEvent.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
        this.renderIsAuth = this.renderIsAuth.bind(this);
        this.state = {
          loginMessage: ''
        };
    }

    onLoginSubmit(event) {
      event.preventDefault();
      const login = ReactDOM.findDOMNode(this.refs.login).value;
		  const password = ReactDOM.findDOMNode(this.refs.password).value;

      this.props.manualLogin({ login, password })
        .then(loginMessage => {
          if (loginMessage) {
            this.setState({
              loginMessage
            });
          } else {
            this.setState({
              loginMessage: ''
            });
          }
        });

      ReactDOM.findDOMNode(this.refs.login).value = '';
      ReactDOM.findDOMNode(this.refs.password).value = '';
    }

    logoutEvent(event) {
      event.preventDefault();
      this.props.manualLogout();
    }

    renderIsAuth({ authenticated, login = 'Anonymous' }) {
      if (!authenticated) {
        return (
          <Form inline onSubmit={ this.onLoginSubmit }  className='header-font'>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="signId" className="mr-sm-2">ID</Label>
              <Input type="text" ref="login" id="signId" placeholder="Your personal ID" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="pass" className="mr-sm-2">Password</Label>
              <Input type="password" ref="password" id="pass" placeholder="Your password" />
            </FormGroup>
            <Button outline color="info">Login</Button> 
          </Form>
        );
      } else {
        return (
          <div className='header-font'>
            Hello, { login + ' ' }
            <Button outline color="info" onClick={ this.logoutEvent }>Logout</Button>
          </div>
        );
      }
    }

    renderAlert(message) {
      if (message) {
        return (
          <Alert color="danger">
            { message }
          </Alert>
        );
      } else {
        return '';
      }
    }

    render() {
        return (
        <div>
          <Navbar color='dark'>
            <NavbarBrand href="/">Frontcamp</NavbarBrand>            
              { this.renderIsAuth(this.props.user) }            
          </Navbar>
          { this.renderAlert(this.state.loginMessage) }
        </div>
      );
    }
}

export default connect(mapStateToProps, authActions)(Auth);
