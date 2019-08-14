import axios from 'axios';
import { returnErrors, createMessage } from './messages';
import {
    CATEGORIES_LOADED,
    EVENTS_ERROR,
    EVENTS_LOADED,
    EVENTS_LOADING,
    SET_CATEGORY, CLEAR_EVENTS, URL
} from "./types";

export const clearEvents = () => (dispatch) => {
    dispatch({ type: CLEAR_EVENTS });
};

export const loadEvents = (categoryId) => (dispatch) => {
    dispatch({ type: EVENTS_LOADING });
    axios.get(`${URL}/api/events/categoryEvents/${categoryId}`)
        .then(res => {
            dispatch({
                type: EVENTS_LOADED,
                payload: res.data.events
            })
        })
        .catch(err => {
            dispatch(createMessage({ loadEventsFail: "Events cannot be loaded" }));
            dispatch({
                type: EVENTS_ERROR
            });
        })
};

export const loadCategories = (categoryId) => (dispatch) => {
    dispatch({ type: EVENTS_LOADING });
    axios.get(`${URL}/api/events/categories/${categoryId}`)
        .then(res => {
            dispatch({
                type: CATEGORIES_LOADED,
                payload: res.data.subcategories
            })
        })
        .catch(err => {
            dispatch(createMessage({ loadCategoriesFail: "Categories cannot be loaded!" }));
            dispatch({
                type: EVENTS_ERROR
            });
        })
};

export const setCategory = (category) => (dispatch) => {
    dispatch({
        type: SET_CATEGORY,
        payload: {
            category: category
        }
    });
};