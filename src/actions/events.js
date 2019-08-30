import {FETCH_EVENT_CATEGORY, FETCH_EVENT_TYPE, FETCH_EVENTS,} from "./types";

export const fetchEvents = () => (dispatch) => {
    dispatch({type: FETCH_EVENTS})
};

export const fetchEvent = (id) => (dispatch) => {
    dispatch({type: FETCH_EVENTS, data: id})
};

export const fetchEventCategories = () => (dispatch) => {
    dispatch({type: FETCH_EVENT_CATEGORY})
};

export const fetchEventTypes = () => (dispatch) => {
    dispatch({type: FETCH_EVENT_TYPE})
};