import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Row, Alert } from 'reactstrap'

import Header from './components/header/Header'
import BlogList from './components/blog-list/BlogList'
import CreateBlog from './components/create-blog/CreateBlog'
// import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

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
          <header className="App-header">
            <CreateBlog></CreateBlog>
          </header>
          <div className="App-intro">
            <BlogList></BlogList>
          </div>
        </div>
      )
    } else {
      return (
        <Alert className='not-auth-alert' color="warning">
          You aren't authenticated!
        </Alert>)
    }
  }

  renderSpinner () {
    return (<div className='loader'>Loading...</div>)
  }

  render () {
    const user = this.props.user
    return (
      <div>
        <Header></Header>
        {/* <Container className="App">          
          { this.renderMain(user.authenticated) }
          { user.isWaiting ? this.renderSpinner() : ''}
        </Container> */}
      </div> 
    )
  }
}

export default connect(mapStateToProps)(App)
