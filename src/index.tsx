import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './components/app/app';
import { rootReducer } from './services/reducers';

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore( rootReducer, enhancer);


ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root'),
);

reportWebVitals();
