
import {  legacy_createStore as createStore } from "redux";
import bookReducer from "./bookTicket/bookReducer";


const store = createStore(bookReducer);

export default store;
