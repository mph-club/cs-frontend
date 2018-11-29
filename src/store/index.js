import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import SessionReducer from "./authentication/session.js";

// Choosing the appropriate compose
// Use Redux DevTools if available otherwise default Redux compose
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// Creating root reducer
const rootReducer = combineReducers({
  SessionReducer
});

// Initial state
const initialState = {};

// Middlewares
const middlewares = [thunk];

// Enhancers
const enhancers = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);

export default createStore(rootReducer, initialState, enhancers);
