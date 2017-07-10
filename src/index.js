import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import pako from 'pako';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

//TODO: move this somewhere else
const initialState = getInitialState();
function getInitialState() {
    let search = window.location.search;
    if (!search || !search.length) {
        return {};
    }

    let encoded = search.split('?state=')[1];
    let deflated = window.atob(encoded);

    return JSON.parse(pako.inflate(deflated, { to: 'string' }));
}


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, initialState)}>
    <App />
  </Provider>
  , document.querySelector('.container'));


