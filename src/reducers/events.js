import {
    EVENTS_LOADING,
    EVENTS_LOADED,
    EVENTS_ERROR,
    SET_CATEGORY,
    CATEGORIES_LOADED, CLEAR_EVENTS
} from "../actions/types";

const initialState = {
    category: null,
    categories: [],
    events: [],
    isLoadingEvents: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case EVENTS_LOADING:
            return {
                ...state,
                isLoadingEvents: true
            };
        case EVENTS_LOADED:
            return {
                ...state,
                isLoadingEvents: false,
                events: action.payload
            };
        case CLEAR_EVENTS:
        case EVENTS_ERROR:
            return {
                ...state,
                events: [],
                isLoadingEvents: false
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload.category
            };
        case CATEGORIES_LOADED:
            return {
                ...state,
                isLoadingEvents: false,
                categories: action.payload
            };
        default:
            return state;

    }
}