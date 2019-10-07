import {
    LOADER_AUTH_LOGIN,
    LOADER_AUTH_LOGOUT,
    LOADER_AUTH_REGISTER, LOADER_AUTH_UPDATE,
    LOADER_AUTH_USER, LOADER_EVENT_CHECK_REGISTERED, LOADER_EVENT_REGISTER, LOADER_TEAM_REGISTER
} from "../actions/types";

const initialState = {
    isLoading: {
        login: false,
        logout: false,
        user: false,
        register: false,
        update: false,
        checkRegister: false,
        eventRegister: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADER_AUTH_LOGIN:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    login: action.payload
                }
            };
        case LOADER_AUTH_LOGOUT:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    logout: action.payload
                }
            };
        case LOADER_AUTH_USER:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    user: action.payload
                }
            };
        case LOADER_AUTH_REGISTER:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    register: action.payload
                }
            };
        case LOADER_AUTH_UPDATE:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    update: action.payload
                }
            };
        case LOADER_EVENT_CHECK_REGISTERED:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    checkRegister: action.payload
                }
            };
        case LOADER_TEAM_REGISTER:
        case LOADER_EVENT_REGISTER:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    eventRegister: action.payload
                }
            };
        default:
            return state
    }
};