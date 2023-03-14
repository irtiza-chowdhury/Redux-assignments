import { combineReducers } from 'redux';
import bookReducer from './books/bookReducer';
import editReduce from './edit/editReducer';
import filterReducer from './filters/filterReducer';

const rootReducer = combineReducers({ book: bookReducer, filter: filterReducer, edit: editReduce });

export default rootReducer;
