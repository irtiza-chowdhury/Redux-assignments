/* eslint-disable no-unused-vars */
import { added } from '../action';

const addBook = (name, author, thumbnail, price, rating, featured) => async (dispatch) => {
  await fetch('http://localhost:9000/books', {
    method: 'POST',
    body: JSON.stringify({
      name,
      author,
      thumbnail,
      price,
      rating,
      featured,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  dispatch(added(name, author, thumbnail, price, rating, featured));
};
export default addBook;
