import { combineReducers } from 'redux';
import user from './users';

function listBlogs(state = [], action) {
    return state;
}

function createBlog(state = {}, action) {
    return state;
}

export default combineReducers({
    user,
    createBlog,
    listBlogs
});