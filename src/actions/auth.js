import axios from 'axios';
import {createMessage} from './messages';
import  _ from 'lodash';

import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    UPDATE_FAIL,
    UPDATE_SUCCESS,
    LOADER_AUTH_USER,
    USER_LOADED,
    LOADER_AUTH_REGISTER,
    LOADER_AUTH_LOGIN,
    LOADER_AUTH_LOGOUT, LOADER_AUTH_UPDATE, CLEAR_EVENT
} from './types';

import {
    BACKEND_URL
} from '../api/endpoints'

export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: LOADER_AUTH_USER,
        payload: true
    });

    axios.get(`${BACKEND_URL}/api/auth/user`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
            dispatch({
                type: LOADER_AUTH_USER,
                payload: false
            });
        }).catch(err => {
        dispatch({
            type: AUTH_ERROR
        });
        dispatch({
            type: LOADER_AUTH_USER,
            payload: false
        });
    });
};

export const login = (username, password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    dispatch({
        type: LOADER_AUTH_LOGIN,
        payload: true
    });
    const body = JSON.stringify({username, password});

    axios.post(`${BACKEND_URL}/api/auth/login`, body, config)
        .then(res => {
            // console.log(res.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage({loginSuccess: "User login successful"}));
            dispatch({
                type: LOADER_AUTH_LOGIN,
                payload: false
            });
        }).catch(err => {
        dispatch(createMessage({loginFail: "Incorrect Username/Password"}));
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch({
            type: LOADER_AUTH_LOGIN,
            payload: false
        });
    })
};

export const register = ({username, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    dispatch({
        type: LOADER_AUTH_REGISTER,
        payload: true
    });

    const body = JSON.stringify({username, email, password});

    axios.post(`${BACKEND_URL}/api/auth/register`, body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage({registerSuccess: "User registered successfully \nUsername will be your PECFEST ID."}));
            dispatch({
                type: LOADER_AUTH_REGISTER,
                payload: false
            });
        })
        .catch(err => {
            console.log(err.response);
            if(!_.isEmpty(err.response.data) && err.response.data.username.length > 0){
                const errorMessage = err.response.data.username.join('\n');
                dispatch(createMessage({registerFail: errorMessage}));
            }
            else {
                dispatch(createMessage({registerFail: "User registration failed"}));
            }
            dispatch({
                type: REGISTER_FAIL
            });
            dispatch({
                type: LOADER_AUTH_REGISTER,
                payload: false
            });
        })
};

export const update = ({firstName, lastName, contactNumber, accommodation, college, address, yearOfStudy, gender, id, firstTimer}) => (dispatch, getState) => {

    dispatch({
        type: LOADER_AUTH_UPDATE,
        payload: true
    });
    const body = JSON.stringify({
        firstName,
        lastName,
        contactNumber,
        accommodation,
        college,
        address,
        yearOfStudy,
        gender,
        id,
        firstTimer
    });

    axios.post(`${BACKEND_URL}/api/auth/profile`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage({updateSuccess: "Details updated successfully"}));
            dispatch({
                type: LOADER_AUTH_UPDATE,
                payload: false
            });
        }).catch(err => {
        dispatch(createMessage({updateFail: "User update failed"}));
        dispatch({
            type: UPDATE_FAIL
        });
        dispatch({
            type: LOADER_AUTH_UPDATE,
            payload: false
        });
    })
};

export const logout = () => (dispatch, getState) => {

    dispatch({
        type: LOADER_AUTH_LOGOUT,
        payload: true
    });
    axios.post(`${BACKEND_URL}/api/auth/logout/`, null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            dispatch({
                type: CLEAR_EVENT
            });
            dispatch(createMessage({logoutSuccess: "User logout successful"}));
            dispatch({
                type: LOADER_AUTH_LOGOUT,
                payload: false
            });
        }).catch(err => {
        dispatch(createMessage({logoutFail: "User Logout failed"}));
        dispatch({
            type: LOADER_AUTH_LOGOUT,
            payload: false
        });
    })
};

export const tokenConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
};