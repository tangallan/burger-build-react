import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart()); //dispatch(purchaseBurgerStart());

    try
    {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData)); // dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    }
    catch(error) {
        yield put(actions.purchaseBurgerFail(error)); //dispatch(purchaseBurgerFail(error));
    }
};

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart()); // dispatch(fetchOrdersStart());
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    
    try {
        const res = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders)); // dispatch(fetchOrdersSuccess(fetchedOrders));
    }
    catch(e) {
        yield put(actions.fetchOrdersFail(e)); //dispatch(fetchOrdersFail(e));
    }

    
};