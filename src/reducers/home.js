import {FETCH_BROCHURE_FAIL, FETCH_BROCHURE_SUCCESS} from "../actions/types";
import _ from "lodash";

const initialState = {
    brochures: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BROCHURE_SUCCESS:
            return {
                ...state,
                brochures: _.unionBy(action.payload, state.brochures, "id"),
            };
        case FETCH_BROCHURE_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}