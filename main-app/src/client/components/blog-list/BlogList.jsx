import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as blogsActions from '../../actions/blogsActions'
import './blog-list.css'

const mapStateToProps = (state) => ({
  user: state.user,
  blogs: state.blogs
})

class BlogList extends Component {
  constructor () {
    super()
    // this.renderList = this.renderList.bind(this)
    // this.removeBlog = this.removeBlog.bind(this)
  }

  componentDidMount () {
    this.props.loadAllBlogs()
  }

  handleFilter (event) {

  }

  removeBlog (event) {
    console.log(event.target.name)
  }

  // renderCard ({ id, title, body }) {
  //   return (
  //     <div key={ id }>
        
  //     </div>)
  // };

  // renderList (elems) {
  //   if (!elems || !elems.length) {
  //     return (<div>No data available!</div>)
  //   }
  //   return (
  //     <Row>
  //       { elems.map(elem => this.renderCard(elem)) }
  //     </Row>
  //   )
  // }

  render () {
    return (
      <div>
        LOl
      </div>
    )
  }
}

export default connect(mapStateToProps, blogsActions)(BlogList)
