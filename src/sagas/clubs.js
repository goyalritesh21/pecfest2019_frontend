import {call, put, takeLatest} from "@redux-saga/core/effects";
import axios from "axios";
import {GET_CLUBS_ENDPOINT} from "../api/endpoints";
import {FETCH_CLUBS, FETCH_CLUBS_FAIL, FETCH_CLUBS_SUCCESS} from "../actions/types";

export function* fetchClubs(action) {
    try {
        const response = yield call(() => {
            return axios.get(GET_CLUBS_ENDPOINT);
        });

        yield put({
            type: FETCH_CLUBS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        yield put({
            type: FETCH_CLUBS_FAIL,
            payload: error
        });
    }
}

export default function* clubsSaga() {
    yield takeLatest(FETCH_CLUBS, fetchClubs);
}