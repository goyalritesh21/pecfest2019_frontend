import {call, put, takeLatest} from "@redux-saga/core/effects";
import * as axios from "axios";
import {GET_BROCHURES_ENDPOINT} from "../api/endpoints";
import {FETCH_BROCHURE, FETCH_BROCHURE_FAIL, FETCH_BROCHURE_SUCCESS} from "../actions/types";

export function* fetchBrochure(action) {
    try {
        const response = yield call(() => {
            return axios.get(`${GET_BROCHURES_ENDPOINT}`);
        });

        yield put({
            type: FETCH_BROCHURE_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        yield put({
            type: FETCH_BROCHURE_FAIL,
            payload: error
        });
    }
}

export default function* homeSaga() {
    yield takeLatest(FETCH_BROCHURE, fetchBrochure);
}