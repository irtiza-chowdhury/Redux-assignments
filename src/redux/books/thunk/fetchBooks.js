import { loaded } from '../action';

const fetchBooks = async (dispatch) => {
  const responese = await fetch('http://localhost:9000/books');
  const books = await responese.json();
  dispatch(loaded(books));
};
export default fetchBooks;
