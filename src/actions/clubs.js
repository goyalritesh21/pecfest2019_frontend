import {FETCH_CLUBS} from "./types";

export const fetchClubs = () => (dispatch) => {
    dispatch({type: FETCH_CLUBS})
};