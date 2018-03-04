import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Row, Alert } from 'reactstrap'

import Header from './components/header/Header'
import BlogList from './components/blog-list/BlogList'
import CreateBlog from './components/create-blog/CreateBlog'
import LoginForm from './components/login-form/LoginForm'

const mapStateToProps = (state) => ({
  user: state.user
})

class App extends Component {
  constructor () {
    super()
    this.renderMain = this.renderMain.bind(this)
    this.renderSpinner = this.renderSpinner.bind(this)
  }

  renderMain (authenticated) {
    if (authenticated) {
      return (
        <div>
          <CreateBlog></CreateBlog>
          <BlogList></BlogList>
        </div>
      )
    } else {
      return (<LoginForm user={this.props.user}></LoginForm>)
    }
  }

  renderSpinner () {
    return (<div className='loader'>Loading...</div>)
  }

  render () {
    const user = this.props.user
    return (
      <div>
        <Header user={user}></Header>
        { this.renderMain(user.authenticated) }
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
