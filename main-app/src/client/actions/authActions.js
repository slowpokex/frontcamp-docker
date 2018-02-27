import axios from 'axios';
import * as types from '../config/constants'
import config from '../config';

function beginLogin() {
	return { type: types.MANUAL_LOGIN_USER }
}

function loginError() {
	return { type: types.LOGIN_ERROR_USER }
}

function loginSuccess(data) {
	return { 
		type: types.LOGIN_SUCCESS_USER,
		data
	}
}

function beginLogout() {
	return { type: types.LOGOUT_USER }
}

function logoutSuccess() {
	return { type: types.LOGOUT_SUCCESS_USER }
}

function logoutError() {
	return { type: types.LOGOUT_ERROR_USER }
}

function makeUserRequest(method, data, api = config.LOGIN_PATH) {
	return axios({
		method: method,
		url: api,
		data: data
	})
}

export function manualLogin(data) {
    return dispatch => {
        dispatch(beginLogin());

        return makeUserRequest('post', data).then(response => {
            if (response.data.success) {					
                dispatch(loginSuccess(data));
            } else {					
                dispatch(loginError());
                return response.data.message;				
            }
        })
        .catch(response => {
            if (response instanceof Error) {
                console.log('Error', response.message);
            }
        });
    };
}

export function manualLogout() {
	return dispatch => {
		dispatch(beginLogout());

		return axios.get(config.LOGOUT_PATH)
			.then(response => {
				if (response.data.success) {
					dispatch(logoutSuccess());
				} else {
					dispatch(logoutError());
				}
			})
			.catch(response => {
			    if (response instanceof Error) {
			      console.log('Error', response.message);
			    }
			})
	}			
}