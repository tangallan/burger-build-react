import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducier', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });

    it('shoud store the token upon login', () => {
        expect(
            authReducer(
                {
                    token: null,
                    userId: null,
                    error: null,
                    loading: false,
                    authRedirect: '/'
                },
                {
                    type: actionTypes.AUTH_SUCCESS,
                    idToken: 'some-token',
                    userId: 'some-user-id'
                }
            )
        ).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });
});
