import {
    LOADER_AUTH_LOGIN,
    LOADER_AUTH_LOGOUT,
    LOADER_AUTH_REGISTER, LOADER_AUTH_UPDATE,
    LOADER_AUTH_USER
} from "../actions/types";

const initialState = {
    isLoading: {
        login: false,
        logout: false,
        user: false,
        register: false,
        update: false
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
        default:
            return state
    }
};