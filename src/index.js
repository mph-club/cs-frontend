import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store/index.js";
import {Provider} from "react-redux";
import { setupCognito } from 'react-cognito';
import config from './config/cognito.json';

setupCognito(store, config);

ReactDOM.render(
	<Provider store={store}>
            <App />
        </Provider>
        ,document.getElementById('root'));
registerServiceWorker();
