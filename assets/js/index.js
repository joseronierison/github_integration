// import pages
import "bootstrap-includes";
import "../sass/style.scss";

import Routes from "./routes";
import reducers from "./reducers";
import { createStore, applyMiddleware, compose } from "redux"
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("react-app")
);
