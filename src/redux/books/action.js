import { ADDED, DELETED, LOADED } from './actionType';

export const loaded = (books) => ({
  type: LOADED,
  payload: books,
});

export const added = (name, author, thumbnail, price, rating, featured) => ({
  type: ADDED,
  payload: { name, author, thumbnail, price, rating, featured },
});

export const deleted = (bookId) => ({
  type: DELETED,
  payload: bookId,
});
