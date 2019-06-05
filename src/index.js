import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import Main from './router';
import * as serviceWorker from './serviceWorker';
import allRedusers from './reducers';
import initialStore from './initialStore';
import rootSaga from "./sagas";
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(allRedusers, initialStore, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga, [555]);

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
