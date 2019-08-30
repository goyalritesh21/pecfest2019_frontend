import axios from 'axios';
import {createMessage, returnErrors} from "./messages";

import {
    CHECK_REGISTER,
    CLEAR_EVENT,
    EVENT_ERROR,
    EVENT_LOADED,
    EVENT_LOADING,
    EVENT_REGISTER_FAIL,
    EVENT_REGISTER_SUCCESS,
    SET_EVENT
} from "./types";
import {tokenConfig} from "./auth";

import {URL} from '../api/endpoints'

export const clearEvent = () => (dispatch) => {
    dispatch({type: CLEAR_EVENT});
};

export const loadEvent = (eventId) => (dispatch) => {
    dispatch({type: EVENT_LOADING});
    axios.get(`${URL}/api/events/${eventId}`)
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
    dispatch({type: EVENT_LOADING});
    const body = JSON.stringify({eventID, username});
    console.log(body);
    axios.post(`${URL}/api/events/register`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EVENT_REGISTER_SUCCESS
            });
            dispatch(createMessage({registerEventSuccess: "Registered Successfully!"}));
        })
        .catch(error => {
            if (error.response.status === 302) {
                dispatch({
                    type: EVENT_REGISTER_SUCCESS
                });
                dispatch(createMessage({registerEventFail: "Already Registered!"}));
            } else {
                dispatch(createMessage({registerEventFail: "Event Registration failed!"}));
                dispatch({
                    type: EVENT_REGISTER_FAIL
                });
            }
        });
};

export const checkRegistered = ({eventID, username}) => (dispatch, getState) => {
    dispatch({type: EVENT_LOADING});
    const body = JSON.stringify({eventID, username});
    console.log(body);
    axios.post(`${URL}/api/events/checkRegistered`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHECK_REGISTER,
                payload: res.data
            });
        })
        .catch(error => {
            // dispatch(returnErrors(error.response.data, error.response.status));
        });
};

export const setEvent = (eventId) => (dispatch) => {
    dispatch({
        type: SET_EVENT,
        payload: {
            eventId: eventId
        }
    });
};