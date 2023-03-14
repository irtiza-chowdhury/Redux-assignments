import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditExistingBookMutation } from '../../features/api/ApiSlice';
import Error from '../ui/Error';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function EditForm({ book }) {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (book.id) {
      setName(book.name);
      setAuthor(book.author);
      setThumbnail(book.thumbnail);
      setPrice(Number(book.price));
      setRating(Number(book.rating));
      setFeatured(book.featured);
    }
  }, [book.author, book.featured, book.id, book.name, book.price, book.rating, book.thumbnail]);

  const [editExistingBook, { isLoading, isError }] = useEditExistingBookMutation();

  const resetForm = () => {
    setName('');
    setAuthor('');
    setThumbnail('');
    setPrice('');
    setRating('');
    setFeatured(false);
  };

  const navigate = useNavigate();

  const handleUpdateBook = (e) => {
    e.preventDefault();
    editExistingBook({
      id: book?.id,
      data: {
        name,
        author,
        thumbnail,
        price: Number(price),
        rating: Number(rating),
        featured,
      },
    });
    resetForm();
    navigate('/');
  };

  return (
    <form className="book-form" onSubmit={handleUpdateBook}>
      <div className="space-y-2">
        <label htmlFor="lws-bookName">Book Name</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-bookName"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-author">Author</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-thumbnail">Image Url</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-thumbnail"
          name="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 pb-4">
        <div className="space-y-2">
          <label htmlFor="lws-price">Price</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-rating">Rating</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-rating"
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
          id="lws-featured"
          type="checkbox"
          name="featured"
          className="w-4 h-4"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        <label htmlFor="lws-featured" className="ml-2 text-sm">
          This is a featured book
        </label>
      </div>

      <button disabled={isLoading} type="submit" className="submit" id="lws-submit">
        {isLoading ? <ThreeDot /> : 'Edit Book'}
      </button>

      {isError && <Error message="There is an error in editing..." />}
    </form>
  );
}
