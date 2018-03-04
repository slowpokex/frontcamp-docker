import { combineReducers } from 'redux'
import user from './users'
import blogs from './blogs'

export default combineReducers({
  user,
  blogs
})
