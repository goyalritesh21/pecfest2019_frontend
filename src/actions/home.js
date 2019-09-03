import {FETCH_BROCHURE} from "./types";

export const fetchBrochure = () => (dispatch) => {
    dispatch({type: FETCH_BROCHURE})
};