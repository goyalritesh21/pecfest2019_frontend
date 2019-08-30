import {FETCH_SPONSORS} from "./types";

export const fetchSponsors = () => (dispatch) => {
    dispatch({type: FETCH_SPONSORS})
};