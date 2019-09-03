import axios from 'axios';
import {createMessage} from './messages';

import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    UPDATE_FAIL,
    UPDATE_SUCCESS,
    USER_LOADED,
    USER_LOADING
} from './types';

import {
    BACKEND_URL
} from '../api/endpoints'

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios.get(`${BACKEND_URL}/api/auth/user`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
        dispatch({
            type: AUTH_ERROR
        });
    })
};

export const login = (username, password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, password});

    axios.post(`${BACKEND_URL}/api/auth/login`, body, config)
        .then(res => {
            // console.log(res.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
        dispatch(createMessage({loginFail: "User login failed"}));
        dispatch({
            type: LOGIN_FAIL
        });
    })
};

export const register = ({username, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, email, password});

    axios.post(`${BACKEND_URL}/api/auth/register`, body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
        dispatch(createMessage({registerFail: "User registration failed"}));
        dispatch({
            type: REGISTER_FAIL
        });
    })
};

export const update = ({firstName, lastName, contactNumber, accommodation, college, address, yearOfStudy, gender, id, firstTimer}) => (dispatch, getState) => {

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
        }).catch(err => {
        dispatch(createMessage({updateFail: "User update failed"}));
        dispatch({
            type: UPDATE_FAIL
        });
    })
};

export const logout = () => (dispatch, getState) => {

    axios.post(`${BACKEND_URL}/api/auth/logout/`, null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
        dispatch(createMessage({logoutFail: "User Logout failed"}));
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