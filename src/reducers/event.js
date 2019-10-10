import {
    EVENT_ERROR,
    EVENT_LOADED,
    EVENT_LOADING,
    EVENT_REGISTER_SUCCESS,
    EVENT_REGISTER_FAIL,
    SET_EVENT, CLEAR_EVENT, CHECK_REGISTER, TEAM_REGISTER_SUCCESS, TEAM_REGISTER_FAIL
} from "../actions/types";

const initialState = {
    eventLoading: false,
    event: null,
    registered: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENT:
            return {
                ...state,
                event: {
                    eventId: action.payload.eventId
                }
            };
        case EVENT_LOADING:
            return {
                ...state,
                eventLoading: true
            };
        case EVENT_LOADED:
            return {
                ...state,
                eventLoading: false,
                event: action.payload
            };
        case EVENT_ERROR:
        case CLEAR_EVENT:
            return {
                ...state,
                eventLoading: false,
                event: null,
                registered: false
            };
        case TEAM_REGISTER_SUCCESS:
        case EVENT_REGISTER_SUCCESS:
            return {
                ...state,
                registered: true,
                eventLoading: false
            };
        case TEAM_REGISTER_FAIL:
        case EVENT_REGISTER_FAIL:
            return {
                ...state,
                registered: false,
                eventLoading: false
            };
        case CHECK_REGISTER:
            return {
                ...state,
                registered: action.payload
            };
        default:
            return state;
    }
}