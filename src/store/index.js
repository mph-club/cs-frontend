import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import { cognito } from 'react-cognito';

import SessionReducer from './authentication/session.js'

export default createStore(
    combineReducers({
      SessionReducer,
      cognito,
    }),
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
);
