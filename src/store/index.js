import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"

import SessionReducer from './authentication/session.js'

export default createStore(
    combineReducers({
      SessionReducer,
    }),
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
);
