import { createStore, applyMiddleware, compose } from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';
import 'bootstrap-includes';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Routes from './routes';
import '../sass/style.scss';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('react-app'),
);
