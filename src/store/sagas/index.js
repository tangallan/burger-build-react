import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

// sagas
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
    // another way instead of listing one by one
    // runs simultaneously
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
    
    // CALL logoutSaga whenever the action 'AUTH_INITIATE_LOGOUT' is triggered
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
};

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    // what if you just want one of the saga runs ??? what if we just want to use the latest click
    // takeLatest will automatically cancel the prevs call
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}