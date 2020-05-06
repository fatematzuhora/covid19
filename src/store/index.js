import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from 'store/reducers/rootReducer';
import { ENV } from 'config';

let middleware = [thunk]
let enhancers = [ applyMiddleware(...middleware) ]

if (ENV === 'dev') {
    middleware.push(logger);
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const configureStore = createStore( rootReducer, compose(...enhancers))
export default configureStore;