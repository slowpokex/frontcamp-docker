import axios from 'axios';
import * as types from '../config/constants';
import config from '../config';

const showError = (response) => {
  if (response instanceof Error) {
    console.log('Error', response);
  }
};

function beginLoading() {
  return { type: types.BEGIN_LOADING_ALL_BLOGS };
}

function errorLoading() {
  return { type: types.ERROR_LOADING_ALL_BLOGS };
}

function successLoading(data) {
  return {
    type: types.SUCCESS_LOADING_ALL_BLOGS,
    data,
  };
}

function beginCreate() {
  return { type: types.BEGIN_CREATE_BLOG };
}

function errorCreate() {
  return { type: types.ERROR_CREATE_BLOG };
}

function successCreate(data) {
  return {
    type: types.SUCCESS_CREATE_BLOG,
    data,
  };
}

function beginDelete() {
  return { type: types.BEGIN_DELETE_BLOG };
}

function errorDelete() {
  return { type: types.ERROR_DELETE_BLOG };
}

function successDelete(data) {
  return {
    type: types.SUCCESS_DELETE_BLOG,
    data,
  };
}

function makeCreateRequest(method, data, api = config.BLOGS_PATH) {
  return axios({
    method,
    url: api,
    data,
  });
}

export function publishBlog(data) {
  return (dispatch) => {
    dispatch(beginCreate());

    return makeCreateRequest('post', data)
      .then((response) => {
        if (response.data) {
          dispatch(successCreate(data));
        } else {
          dispatch(errorCreate());
          return response.data.message;
        }
      })
      .catch(showError);
  };
}

export function loadAllBlogs() {
  return (dispatch) => {
    dispatch(beginLoading());

    return axios.get(config.BLOGS_PATH)
      .then((response) => {
        if (response.data) {
          dispatch(successLoading(response.data));
        } else {
          dispatch(errorLoading());
        }
      })
      .catch(showError);
  };
}

export function removeBlog(id) {
  return (dispatch) => {
    dispatch(beginDelete());

    return axios.delete(`${config.BLOGS_PATH}/${id}`)
      .then((response) => {
        if (response.data) {
          dispatch(successDelete(id));
        } else {
          dispatch(errorDelete());
          return response.data.message;
        }
      })
      .catch(showError);
  };
}
