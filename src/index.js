import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

// sagas
import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas/index';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;
const rootReducers = combineReducers({
    order: orderReducer,
    burgerBuilder: burgerBuilderReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(reduxThunk, sagaMiddleware))
);

// the watch auth acts as a LISTENER
// within the watchAuth it listens to an action
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
