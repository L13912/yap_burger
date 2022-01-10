import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import './index.css';
import App from './components/app/app';
import {rootReducer} from './services/reducers';
import {BrowserRouter as Router} from 'react-router-dom';

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);


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
