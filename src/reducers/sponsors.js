import _ from "lodash";
import {FETCH_SPONSORS_FAIL, FETCH_SPONSORS_SUCCESS} from "../actions/types";

const initialState = {
    sponsors: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SPONSORS_SUCCESS:
            return {
                ...state,
                sponsors: _.unionBy(action.payload, state.sponsors, "id"),
            };
        case FETCH_SPONSORS_FAIL:
            return {
                ...state,
            };
        default:
            return state
    }
}