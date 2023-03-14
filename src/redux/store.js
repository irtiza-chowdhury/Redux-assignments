import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './carts/cartReducer';

const store = createStore(cartReducer, composeWithDevTools());

export default store;
