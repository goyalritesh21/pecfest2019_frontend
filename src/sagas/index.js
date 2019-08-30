import {all} from 'redux-saga/effects'
import eventsSaga from './events'
import authSaga from './auth'
import clubsSaga from './clubs'
import sponsorsSaga from "./sponsors";

export default function* rootSaga() {
    yield all([
        authSaga(),
        eventsSaga(),
        clubsSaga(),
        sponsorsSaga(),
    ])
}