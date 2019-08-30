import {FETCH_CLUBS_FAIL, FETCH_CLUBS_SUCCESS} from "./types";
import _ from "lodash";

const initialState = {
    clubs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLUBS_SUCCESS:
            return {
                ...state,
                clubs: _.unionBy(action.payload, state.clubs, "id"),
            };
        case FETCH_CLUBS_FAIL:
            return {
                ...state,
            };
        default:
            return state
    }
}