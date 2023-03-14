/* eslint-disable default-param-last */
import { EDITBOOK, UPDATEBOOK } from './actionType';
import initialState from './initialState';

const editReduce = (state = initialState, action) => {
  switch (action.type) {
    case EDITBOOK:
      return {
        ...state,
        bookId: action.payload.bookId,
        name: action.payload.name,
        author: action.payload.author,
        thumbnail: action.payload.thumbnail,
        price: action.payload.price,
        rating: action.payload.rating,
        featured: action.payload.featured,
      };
    case UPDATEBOOK:
      return {
        ...state,
        bookId: action.payload.bookId,
        name: action.payload.name,
        author: action.payload.author,
        thumbnail: action.payload.thumbnail,
        price: action.payload.price,
        rating: action.payload.rating,
        featured: action.payload.featured,
      };

    default:
      return state;
  }
};
export default editReduce;
