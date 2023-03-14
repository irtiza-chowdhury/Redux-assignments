import { EDITBOOK, UPDATEBOOK } from './actionType';

export const editBook = (bookId, name, author, thumbnail, price, rating, featured) => ({
  type: EDITBOOK,
  payload: { bookId, name, author, thumbnail, price, rating, featured },
});

export const updateBook = (bookId) => ({
  type: UPDATEBOOK,
  payload: bookId,
});
