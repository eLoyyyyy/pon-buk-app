import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import C from './constants';
import initialState from './initialState.json';
import storeFactory from './store/index';
import App from './App.jsx';

const store = storeFactory();

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-app')
);
