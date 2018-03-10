import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import * as authActions from '../../actions/authActions';
import styles from './header.scss';

const mapStateToProps = state => ({
  user: state.user,
});

const renderLink = (url, description) => (<li><Link to={url}>{description}</Link></li>);

class Header extends Component {
  constructor() {
    super();
    this.logoutEvent = this.logoutEvent.bind(this);
    this.renderIsAuth = this.renderIsAuth.bind(this);
  }

  logoutEvent(event) {
    event.preventDefault();
    this.props.manualLogout();
  }

  renderIsAuth({ authenticated, login = 'Anonymous' }) {
    if (!authenticated) {
      return '';
    }
    return (
      <div className={styles.header_font}>
        <div className={styles.user_name}>
          Hello, {`${login} ` }
        </div>
        <button onClick={this.logoutEvent}>Logout</button>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    return [
      (
        <header key="header" className={styles.header}>
          <div className={styles.header_logo}>
            <Link to="/">Frontcamp</Link>
          </div>
          { this.renderIsAuth(user) }
        </header>
      ), (
        <nav key="navbar" className={styles.navigation}>
          <ul>
            { !user.authenticated ? renderLink('/login', 'Login') : '' }
            { !user.authenticated ? renderLink('/register', 'Register') : '' }
            { user.authenticated ? renderLink('/create', 'Create Blog') : ''}
            { user.authenticated ? renderLink('/list', 'Blog list') : ''}
          </ul>
        </nav>
      ),
    ];
  }
}

export default withRouter(connect(mapStateToProps, authActions)(Header));
