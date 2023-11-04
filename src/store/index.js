import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers'
import { logger } from "redux-logger";
// const cors = require('cors');
let store;

export function configureStore() {
    store = createStore(reducers, applyMiddleware(logger, thunk));

    return store;
}