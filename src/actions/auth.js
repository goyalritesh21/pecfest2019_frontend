import axios from 'axios';
import { returnErrors, createMessage } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL, UPDATE_SUCCESS, UPDATE_FAIL, URL
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get(`${URL}/api/auth/user`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(createMessage({ loadUserFail: "User Loading Failed" }));
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

    const body = JSON.stringify({ username, password });

    axios.post(`${URL}/api/auth/login`, body, config)
        .then(res => {
            // console.log(res.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(createMessage({ loginFail: "USer login failed" }));
            dispatch({
                type: LOGIN_FAIL
            });
        })
};

export const register = ({ username, email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, email, password });

    axios.post(`${URL}/api/auth/register`, body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(createMessage({ registerFail: "User registration failed" }));
            dispatch({
                type: REGISTER_FAIL
            });
        })
};

export const update = ({ firstName, lastName, contactNumber, accommodation, college, address, yearOfStudy, gender, id, firstTimer }) => (dispatch, getState) => {

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

    axios.post(`${URL}/api/auth/profile`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(createMessage({ updateFail: "User update failed" }));
            dispatch({
                type: UPDATE_FAIL
            });
        })
};

export const logout = () => (dispatch, getState) => {

    axios.post(`${URL}/api/auth/logout/`, null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
            dispatch(createMessage({ logoutFail: "User Logout failed" }));
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