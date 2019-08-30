import {call, put} from 'redux-saga/effects'
import axios from "axios";
import {
    FETCH_EVENT,
    FETCH_EVENT_CATEGORY,
    FETCH_EVENT_CATEGORY_FAIL,
    FETCH_EVENT_CATEGORY_SUCCESS,
    FETCH_EVENT_FAIL,
    FETCH_EVENT_SUCCESS,
    FETCH_EVENT_TYPE,
    FETCH_EVENT_TYPE_FAIL,
    FETCH_EVENT_TYPE_SUCCESS,
    FETCH_EVENTS,
    FETCH_EVENTS_FAIL,
    FETCH_EVENTS_SUCCESS
} from "../actions/types";
import {GET_EVENT_CATEGORY_ENDPOINT, GET_EVENT_TYPE_ENDPOINT, GET_EVENTS_ENDPOINT} from "../api/endpoints";
import {takeLatest} from "@redux-saga/core/effects";


export function* fetchEvents(action) {
    try {
        const response = yield call(() => {
            return axios.get(GET_EVENTS_ENDPOINT);
        });

        yield put({
            type: FETCH_EVENTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        yield put({
            type: FETCH_EVENTS_FAIL,
            payload: error
        });
    }
}

export function* fetchEvent(action) {
    try {
        const {event_id} = action.data;

        const response = yield call(() => {
            return axios.get(`${GET_EVENTS_ENDPOINT}/${event_id}`);
        });

        yield put({
            type: FETCH_EVENT_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        yield put({
            type: FETCH_EVENT_FAIL,
            payload: error
        });
    }
}

export function* fetchEventCategories(action) {
    try {
        const response = yield call(() => {
            return axios.get(GET_EVENT_CATEGORY_ENDPOINT);
        });

        yield put({
            type: FETCH_EVENT_CATEGORY_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        yield put({
            type: FETCH_EVENT_CATEGORY_FAIL,
            payload: error
        });
    }
}

export function* fetchEventTypes(action) {
    try {
        const response = yield call(() => {
            return axios.get(GET_EVENT_TYPE_ENDPOINT);
        });

        yield put({
            type: FETCH_EVENT_TYPE_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        yield put({
            type: FETCH_EVENT_TYPE_FAIL,
            payload: error
        });
    }
}

export default function* eventsSaga() {
    yield takeLatest(FETCH_EVENTS, fetchEvents);
    yield takeLatest(FETCH_EVENT, fetchEvent);
    yield takeLatest(FETCH_EVENT_CATEGORY, fetchEventCategories);
    yield takeLatest(FETCH_EVENT_TYPE, fetchEventTypes);
}