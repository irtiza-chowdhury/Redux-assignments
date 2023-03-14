/* eslint-disable no-shadow */
/* eslint-disable default-param-last */
import { ADDED, DELETED, LOADED } from './actionType';
import initialState from './initialState';

const nextBookId = (books) => {
  const maxId = books.reduce((maxId, book) => Math.max(book.id, maxId), -1);
  return maxId + 1;
};
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED:
      return action.payload;

    case ADDED:
      return [
        ...state,
        {
          id: nextBookId(state),
          name: action.payload.name,
          author: action.payload.author,
          thumbnail: action.payload.thumbnail,
          price: action.payload.price,
          rating: action.payload.rating,
          featured: action.payload.featured,
        },
      ];

    case DELETED:
      return state.filter((book) => book.id !== action.payload);

    default:
      return state;
  }
};
export default bookReducer;
