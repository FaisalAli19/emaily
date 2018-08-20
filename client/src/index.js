import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';
import App from './components/App';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
window.axios = axios;

const middleware = []

if (process.env.NODE_ENV === 'production') middleware.push(thunk)
else middleware.push(logger, thunk)

const store = createStore(reducers, {}, applyMiddleware(...middleware))
const jsx = (
	<Provider store={store}>
		<App />
	</Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))


