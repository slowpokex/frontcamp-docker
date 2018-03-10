import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from './components/header/Header';
import BlogList from './components/blog-list/BlogList';
import CreateBlog from './components/create-blog/CreateBlog';

import LoginForm from './components/login-form/LoginForm';
import RegisterForm from './components/register-form/RegisterForm';

import styles from './App.scss';

const mapStateToProps = state => ({
  user: state.user,
});

const UserActions = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/register" component={RegisterForm} />
  </Switch>
);

const renderMain = (authenticated) => {
  if (authenticated) {
    return (<BlogActions />);
  }
  return (<UserActions />);
};

const BlogActions = () => (
  <Switch>
    <Route exact path="/create" component={CreateBlog} />
    <Route exact path="/list" component={BlogList} />
  </Switch>
);

const App = (props) => {
  const { user } = props;
  return (
    <div>
      <Header user={user} />
      <div className={styles.container}>
        {renderMain(user.authenticated)}
      </div>
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(App));
