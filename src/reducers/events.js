import {
    FETCH_EVENT_CATEGORY_FAIL,
    FETCH_EVENT_CATEGORY_SUCCESS,
    FETCH_EVENT_FAIL,
    FETCH_EVENT_SUCCESS,
    FETCH_EVENT_TYPE_FAIL,
    FETCH_EVENT_TYPE_SUCCESS,
    FETCH_EVENTS_FAIL,
    FETCH_EVENTS_SUCCESS
} from "../actions/types";

import _ from 'lodash';

const initialState = {
    eventCategories: [],
    eventTypes: [],
    events: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                events: _.unionBy(action.payload, state.events, "id"),
            };
        case FETCH_EVENTS_FAIL:
            return {
                ...state,
            };
        case FETCH_EVENT_SUCCESS:
            return {
                ...state,
                events: _.map(event => _.isEqual(event.id, action.payload.id) ? action.payload : event),
            };
        case FETCH_EVENT_FAIL:
            return {
                ...state,
            };
        case FETCH_EVENT_CATEGORY_SUCCESS:
            return {
                ...state,
                eventCategories: _.unionBy(action.payload, state.eventCategories, "id"),
            };
        case FETCH_EVENT_CATEGORY_FAIL:
            return {
                ...state,
            };
        case FETCH_EVENT_TYPE_SUCCESS:
            return {
                ...state,
                eventTypes: _.unionBy(action.payload, state.eventTypes, "id"),
            };
        case FETCH_EVENT_TYPE_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}