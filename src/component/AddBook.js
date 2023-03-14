import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addBook from '../redux/books/thunk/addBook';
import fetchBooks from '../redux/books/thunk/fetchBooks';
import updatedBook from '../redux/books/thunk/updateBook';

export default function AddBook() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [featured, setFeatured] = useState(false);
  const [editID, setEditID] = useState();

  const dispatch = useDispatch();

  const editBook = useSelector((state) => state.edit);

  useEffect(() => {
    if (editBook.bookId) {
      setEditID(editBook.bookId);
      setName(editBook.name);
      setAuthor(editBook.author);
      setThumbnail(editBook.thumbnail);
      setPrice(editBook.price);
      setRating(editBook.rating);
      setFeatured(editBook.featured);
    }
  }, [
    editBook.author,
    editBook.bookId,
    editBook.featured,
    editBook.name,
    editBook.price,
    editBook.rating,
    editBook.thumbnail,
  ]);

  const handleUpdateBook = (e) => {
    e.preventDefault();
    dispatch(updatedBook(editID, name, author, thumbnail, Number(price), Number(rating), featured));
    setName('');
    setAuthor('');
    setThumbnail('');
    setPrice('');
    setRating('');
    setFeatured(false);
    setEditID('');
    dispatch(fetchBooks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(name, author, thumbnail, Number(price), Number(rating), featured));
    setEditID('');
    setName('');
    setAuthor('');
    setThumbnail('');
    setPrice('');
    setRating('');
    setFeatured(false);
  };

  return (
    <div>
      <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
        <h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>
        <form
          className="book-form"
          onSubmit={(e) => {
            if (editID) {
              handleUpdateBook(e);
            } else {
              handleSubmit(e);
            }
          }}
        >
          <div className="space-y-2">
            <label htmlFor="name">Book Name</label>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookname"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category">Author</label>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookauthor"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image">Image Url</label>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookthumbnail"
              name="thumbnail"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 pb-4">
            <div className="space-y-2">
              <label htmlFor="price">Price</label>
              <input
                required
                className="text-input"
                type="number"
                id="input-Bookprice"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity">Rating</label>
              <input
                required
                className="text-input"
                type="number"
                id="input-Bookrating"
                name="rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="input-Bookfeatured"
              type="checkbox"
              name="featured"
              className="w-4 h-4"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />

            <label htmlFor="featured" className="ml-2 text-sm">
              This is a featured book
            </label>
          </div>

          <button type="submit" className="submit" id="submit">
            {editID ? 'Submit' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
}
