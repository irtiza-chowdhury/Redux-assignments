import { CARTADDED, CARTDELETE, DECREMENTCOUNT, PRODUCTADDED } from './actionType';

export const cartAdded = (cartId, quantity, count) => ({
  type: CARTADDED,
  payload: { quantity, count, cartId },
});
export const decrementCount = (cartId, quantity, count) => ({
  type: DECREMENTCOUNT,
  payload: { quantity, count, cartId },
});
export const productAdded = (productName, category, imageUrl, price, quantity) => ({
  type: PRODUCTADDED,
  payload: { productName, category, imageUrl, price, quantity },
});
export const cartDeleted = (id, quantity, count) => ({
  type: CARTDELETE,
  payload: { id, quantity, count },
});
