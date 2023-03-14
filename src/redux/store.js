/* eslint-disable import/no-extraneous-dependencies */
import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddlewares from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddlewares)));

export default store;
