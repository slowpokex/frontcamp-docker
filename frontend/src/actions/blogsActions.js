import axios from 'axios';
import * as types from '../config/constants';
import config from '../config';

function beginLoading() {
	return { type: types.BEGIN_LOADING_ALL_BLOGS }
}

function errorLoading() {
	return { type: types.ERROR_LOADING_ALL_BLOGS }
}

function successLoading(data) {
	return { 
		type: types.SUCCESS_LOADING_ALL_BLOGS,
		data
	}
}

function beginCreate() {
	return { type: types.BEGIN_CREATE_BLOG }
}

function errorCreate() {
	return { type: types.ERROR_CREATE_BLOG }
}

function successCreate(data) {
	return { 
		type: types.SUCCESS_CREATE_BLOG,
		data
	}
}

function makeCreateRequest(method, data, api = config.BLOGS_PATH) {
	return axios({
		method: method,
		url: api,
        data: data,
        withCredentials: true,
	})
}

export function publishBlog(data) {
    console.log(data);
    return dispatch => {
        dispatch(beginCreate());

        return makeCreateRequest('post', data)
            .then(response => {
                if (response.data) {					
                    dispatch(successCreate(data));
                } else {					
                    dispatch(errorCreate());
                    return response.data.message;				
                }
            })
            .catch(response => {
                if (response instanceof Error) {
                    console.log('Error', response);
                }
            });
    }
}

export function loadAllBlogs() {
    return dispatch => {
        dispatch(beginLoading());

        return axios.get(config.BLOGS_PATH)
            .then(response => {
                if (response.data.success) {
					dispatch(successLoading());
				} else {
					dispatch(errorLoading());
				}
            })
            .catch(response => {
                if (response instanceof Error) {
                    console.log('Error', response);
                }
            });
    }
}