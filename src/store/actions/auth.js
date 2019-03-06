import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    // THIS SIDE AFFECT is moved to use redux-saga!
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    // moved side affect to saga
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime * 1000);
    // }
}

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    };
    // MOVED to SAGA!
    // return dispatch => {
        // auth the user
        // dispatch(authStart());
        // const authData = {
        //     email: email,
        //     password: password,
        //     returnSecureToken: true
        // };
        
        // let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
        // if (!isSignUp) {
        //     url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
        // }

        // axios
        //     .post(url, authData)
        //     .then(response => {
        //         const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

        //         localStorage.setItem('token', response.data.idToken);
        //         localStorage.setItem('expirationDate', expirationDate);
        //         localStorage.setItem('userId', response.data.localId);

        //         dispatch(authSuccess(response.data.idToken, response.data.localId));
        //         dispatch(checkAuthTimeout(response.data.expiresIn));
        //     })
        //     .catch(error => {
        //         dispatch(authFail(error.response.data.error));
        //     });
    // };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    // MOVED to SAGA
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if(!token) {
    //         dispatch(logout());
    //     } else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         const currentDate = new Date();

    //         if (expirationDate > currentDate) {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId));

    //             const remainingMs = (expirationDate.getTime() - new Date().getTime()) / 1000;
    //             // console.log(`remaining ms: ${remainingMs}`);
    //             dispatch(checkAuthTimeout(remainingMs));
    //         } else {
    //             dispatch(logout());
    //         }
    //     }
    // }
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
};