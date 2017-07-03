import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

//TODO: move this somewhere else
const initialState = {sequence: getInitialState()};
function getInitialState() {
    let search = window.location.search;
    if (!search || !search.length) {
        return {};
    }

    let encoded = search.split('=')[1];
    return JSON.parse(window.atob(encoded));
}


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, initialState)}>
    <App />
  </Provider>
  , document.querySelector('.container'));


