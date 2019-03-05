import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios';

// use action creators
import* as actions from '../actions/index';

// generators? next generation of javascript function
export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
    // setTimeout(() => {
    //     dispatch(logout());
    // }, expirationTime * 1000);
};

export function* authUserSaga(action) {
    yield put(actions.authStart()); // dispatch(authStart());
    
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    if (!action.isSignUp) {
        url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    }

    try
    {
        const response = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId)); //dispatch(authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn)); //dispatch(checkAuthTimeout(response.data.expiresIn));
    }
    catch (error) {
        yield put(actions.authFail(error.response.data.error)); // dispatch(authFail(error.response.data.error));
    }

    // .then(response => {
    //     const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

    //     localStorage.setItem('token', response.data.idToken);
    //     localStorage.setItem('expirationDate', expirationDate);
    //     localStorage.setItem('userId', response.data.localId);

    //     dispatch(authSuccess(response.data.idToken, response.data.localId));
    //     dispatch(checkAuthTimeout(response.data.expiresIn));
    // })
    // .catch(error => {
    //     dispatch(authFail(error.response.data.error));
    // });
    
};