import {call, put, takeLatest} from "@redux-saga/core/effects";
import axios from "axios";
import {GET_SPONSORS_ENDPOINT} from "../api/endpoints";
import {FETCH_SPONSORS, FETCH_SPONSORS_FAIL, FETCH_SPONSORS_SUCCESS} from "../actions/types";

export function* fetchSponsors(action) {
    try {
        const response = yield call(() => {
            return axios.get(GET_SPONSORS_ENDPOINT);
        });

        yield put({
            type: FETCH_SPONSORS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        yield put({
            type: FETCH_SPONSORS_FAIL,
            payload: error
        });
    }
}

export default function* sponsorsSaga() {
    yield takeLatest(FETCH_SPONSORS, fetchSponsors);
}