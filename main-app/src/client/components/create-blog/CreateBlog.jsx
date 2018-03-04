import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { random } from 'lodash'
import * as blogActions from '../../actions/blogsActions'

function mapStateToProps (state, dispatch) {
  return {
    user: state.user,
    listBlogs: state.listBlogs,
    dispatch
  }
}

class CreateBlog extends Component {
  constructor () {
    super()
    this.sendBlog = this.sendBlog.bind(this)
    this.state = {

    }
  }

  sendBlog (event) {
    event.preventDefault()
    const blogTitle = ReactDOM.findDOMNode(this.refs.blogTitle).value
    const blogText = ReactDOM.findDOMNode(this.refs.blogText).value

    const blogForSend = {
      _id: random(0, Number.MAX_SAFE_INTEGER),
      userId: this.props.user.login,
      title: blogTitle,
      body: blogText
    }

    this.props.publishBlog(blogForSend)
  }

  render () {
    return (
      <form onSubmit={ this.sendBlog }>

      </form>)
  }
}

export default connect(mapStateToProps, blogActions)(CreateBlog)
