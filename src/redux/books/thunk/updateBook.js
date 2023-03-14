/* eslint-disable no-unused-vars */

import { updateBook } from '../../edit/action';

const updatedBook =
  (bookId, name, author, thumbnail, price, rating, featured) => async (dispatch) => {
    await fetch(`http://localhost:9000/books/${bookId}`, {
      method: 'PATCH',
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

    dispatch(updateBook(bookId));
  };
export default updatedBook;
