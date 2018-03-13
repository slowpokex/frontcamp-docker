import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as blogsActions from '../../actions/blogsActions';
import styles from './blog-list.scss';

const mapStateToProps = state => ({
  user: state.user,
  blogs: state.blogs,
});

const Card = (props) => {
  const { card } = props;
  return (
    <div className={styles.card}>
      { card.title }
    </div>
  );
};

class BlogList extends Component {
  constructor() {
    super();
    this.handleFilter = this.handleFilter.bind(this);
    this.removeBlog = this.removeBlog.bind(this);
  }

  componentDidMount() {
    this.props.loadAllBlogs();
  }

  handleFilter(event) {

  }

  removeBlog(event) {

  }

  render() {
    const { blogs: { listBlogs } } = this.props;
    return (
      <div className={styles.card_list}>
        {listBlogs.map(card => (<Card
          onRemove={this.removeBlog}
          card={card}
          key={card._id}
        />)) }
      </div>
    );
  }
}

export default connect(mapStateToProps, blogsActions)(BlogList);
