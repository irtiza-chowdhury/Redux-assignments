/* eslint-disable no-case-declarations */
/* eslint-disable no-shadow */
/* eslint-disable default-param-last */
import { CARTADDED, CARTDELETE, DECREMENTCOUNT, PRODUCTADDED } from './actionType';
import intialState from './initialState';

const nextCartId = (carts) => {
  const maxId = carts.reduce((maxId, cart) => Math.max(cart.id, maxId), -1);
  return maxId + 1;
};
const cartReducer = (state = intialState, action) => {
  switch (action.type) {
    case PRODUCTADDED:
      return [
        ...state,
        {
          id: nextCartId(state),
          productName: action.payload.productName,
          category: action.payload.category,
          imageUrl: action.payload.imageUrl,
          price: action.payload.price,
          quantity: action.payload.quantity,
          count: 0,
        },
      ];

    case CARTADDED:
      const { quantity, count, cartId } = action.payload;
      return state.map((cart) => {
        if (cart.id !== cartId) {
          return cart;
        }
        return {
          ...cart,
          quantity: quantity - 1,
          count: count + 1,
        };
      });
    case DECREMENTCOUNT:
      return state.map((cart) => {
        if (cart.id !== action.payload.cartId) {
          return cart;
        }
        return {
          ...cart,
          quantity: action.payload.quantity + 1,
          count: action.payload.count - 1,
        };
      });

    case CARTDELETE:
      return state.map((cart) => {
        if (cart.id !== action.payload.id) {
          return cart;
        }
        return {
          ...cart,
          quantity: action.payload.quantity + action.payload.count,
          count: 0,
        };
      });

    default:
      return state;
  }
};

export default cartReducer;
