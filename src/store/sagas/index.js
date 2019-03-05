import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

// sagas
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from './auth';

export function* watchAuth() {
    // CALL logoutSaga whenever the action 'AUTH_INITIATE_LOGOUT' is triggered
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}