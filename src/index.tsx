import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';

import './index.css';
import App from './components/app/app';

import {BrowserRouter as Router} from 'react-router-dom';
import { store } from './services/store';


ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <App/>
            </Router>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root'),
);

reportWebVitals();
