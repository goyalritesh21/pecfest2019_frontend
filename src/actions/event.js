import axios from 'axios';
import {createMessage, returnErrors} from "./messages";

import {
    CHECK_REGISTER,
    CLEAR_EVENT,
    EVENT_ERROR,
    EVENT_LOADED,
    EVENT_LOADING,
    EVENT_REGISTER_FAIL,
    EVENT_REGISTER_SUCCESS, LOADER_EVENT_CHECK_REGISTERED, LOADER_EVENT_REGISTER,
    SET_EVENT
} from "./types";
import {tokenConfig} from "./auth";

import {BACKEND_URL} from '../api/endpoints'

export const clearEvent = () => (dispatch) => {
    dispatch({type: CLEAR_EVENT});
};

export const loadEvent = (eventId) => (dispatch) => {
    dispatch({type: EVENT_LOADING});
    axios.get(`${BACKEND_URL}/api/events/${eventId}`)
        .then(res => {
            dispatch({
                type: EVENT_LOADED,
                payload: res.data.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: EVENT_ERROR
            });
        })
};

export const registerEvent = ({eventID, username}) => (dispatch, getState) => {
    dispatch({
        type: LOADER_EVENT_REGISTER,
        payload: true
    });
    const body = JSON.stringify({eventID, username});
    // console.log(`${BACKEND_URL}/api/events/register`);
    axios.post(`${BACKEND_URL}/events/${eventID}/register/`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EVENT_REGISTER_SUCCESS
            });
            dispatch({
                type: LOADER_EVENT_REGISTER,
                payload: false
            });
            dispatch(createMessage({registerEventSuccess: "Registered Successfully!"}));
        })
        .catch(error => {
            if (error.response.status === 302) {
                dispatch({
                    type: EVENT_REGISTER_SUCCESS
                });
                dispatch({
                    type: LOADER_EVENT_REGISTER,
                    payload: false
                });
                dispatch(createMessage({registerEventFail: "Already Registered!"}));
            } else {
                dispatch(createMessage({registerEventFail: "Event Registration failed!"}));
                dispatch({
                    type: LOADER_EVENT_REGISTER,
                    payload: false
                });
                dispatch({
                    type: EVENT_REGISTER_FAIL
                });
            }
        });
};

export const checkRegistered = ({eventID, username}) => (dispatch, getState) => {
    dispatch({type: LOADER_EVENT_CHECK_REGISTERED, payload: true});
    const body = JSON.stringify({eventID, username});
    // console.log(body);
    axios.get(`${BACKEND_URL}/api/events/register/${eventID}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHECK_REGISTER,
                payload: res.data
            });
            dispatch({type: LOADER_EVENT_CHECK_REGISTERED, payload: false});
        })
        .catch(error => {
            dispatch({type: LOADER_EVENT_CHECK_REGISTERED, payload: false});
            // dispatch(returnErrors(error.response.data, error.response.status));
        });
};
