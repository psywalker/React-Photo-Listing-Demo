import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import Main from './router';
import * as serviceWorker from './serviceWorker';
import allRedusers from './reducers';
import initialStore from './initialStore';
import rootSaga from './sagas';
import './index.scss';

//export const renderIntoDocumentFunc = element => ReactDOM.render(element, window.document.getElementById('root'));

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(allRedusers, initialStore, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga, [555]);

// export const App = () => (
//   <Provider store={store}>
//     <Main />
//   </Provider>
// );

// export const App = () => (
//   <Main />
// );

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  window.document.getElementById('root'),
);
// renderIntoDocumentFunc(
//   <Provider store={store}>
//     <Main />
//   </Provider>,
// );
// render(
//   <Provider store={store}>
//     <Main />
//   </Provider>,
//   window.document.getElementById('root'),

// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
