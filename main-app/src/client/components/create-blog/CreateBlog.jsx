import React, { Component } from 'react';
import { connect } from 'react-redux';
import { random, isEmpty } from 'lodash';
import * as blogActions from '../../actions/blogsActions';
import styles from './create-blog.scss';

function mapStateToProps(state, dispatch) {
  return {
    user: state.user,
    listBlogs: state.listBlogs,
    dispatch,
  };
}

class CreateBlog extends Component {
  constructor() {
    super();
    this.sendBlog = this.sendBlog.bind(this);
    this.state = {
      message: '',
    };
  }

  sendBlog(event) {
    event.preventDefault();
    const blogTitle = this.blogTitle.value;
    const blogText = this.blogText.value;
    const { user: { login } } = this.props;

    if (isEmpty(blogTitle)) {
      return this.setState({
        message: 'Title is empty',
      });
    }

    if (isEmpty(blogText)) {
      return this.setState({
        message: 'Text is empty',
      });
    }

    const blogForSend = {
      _id: random(0, Number.MAX_SAFE_INTEGER),
      login,
      title: blogTitle,
      body: blogText,
    };

    this.props.publishBlog(blogForSend);
  }

  render() {
    return (
      <form className={styles.create_blog}>
        <h4 className="text-center">Create Blog</h4>
        <label htmlFor="title">
          Title
          <input
            type="text"
            ref={(input) => { this.blogTitle = input; }}
            placeholder="Your blog title"
          />
        </label>
        <label htmlFor="text">
          Text
          <textarea
            ref={(input) => { this.blogText = input; }}
            placeholder="Write something..."
          />
        </label>
        {this.state.message ? <div className={styles.message}>{this.state.message}</div> : ''}
        <p>
          <input
            type="submit"
            className="button expanded"
            value="Publish"
            onClick={this.sendBlog}
          />
        </p>
      </form>);
  }
}

export default connect(mapStateToProps, blogActions)(CreateBlog);
