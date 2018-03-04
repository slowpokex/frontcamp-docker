import {
  LOAD_ALL_BLOGS,
  BEGIN_LOADING_ALL_BLOGS,
  ERROR_LOADING_ALL_BLOGS,
  SUCCESS_LOADING_ALL_BLOGS,
  CREATE_BLOG,
  BEGIN_CREATE_BLOG,
  ERROR_CREATE_BLOG,
  SUCCESS_CREATE_BLOG,
  DELETE_BLOG,
  BEGIN_DELETE_BLOG,
  ERROR_DELETE_BLOG,
  SUCCESS_DELETE_BLOG
} from '../config/constants'

const blogs = (state = {
  isWaiting: false,
  listBlogs: [],
  createBlog: {}
}, action) => {
  switch (action.type) {
    case LOAD_ALL_BLOGS:
      return Object.assign({}, state, { isWaiting: true })
    case SUCCESS_LOADING_ALL_BLOGS:
      return Object.assign({}, state, { isWaiting: false, listBlogs: action.data })
    case ERROR_LOADING_ALL_BLOGS:
      return Object.assign({}, state, { isWaiting: false, listBlogs: [] })
    default:
      return state
  }
}

export default blogs
