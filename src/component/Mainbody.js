import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/images/logo.svg';
import fetchBooks from '../redux/books/thunk/fetchBooks';
import AddBook from './AddBook';

import Book from './Book';
import Status from './Status';

export default function Mainbody() {
  const books = useSelector((state) => state.book);
  const filter = useSelector((state) => state.filter);

  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const { status } = filter;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks);
  }, [dispatch]);

  const filterByStatus = (book) => {
    switch (status) {
      case 'Featured':
        return book.featured;

      default:
        return true;
    }
  };
  const filteredData = books.filter((book) => {
    if (!input) {
      return book;
    }

    return book.name.toLowerCase().includes(input);
  });

  return (
    <>
      <nav className="py-4 2xl:px-6">
        <div className="container flex items-center justify-between">
          <img src={Logo} width="150px" className="object-contain" alt="Logo" />

          <ul className="hidden md:flex items-center space-x-6">
            <li className="font-semibold cursor-pointer">Book Store</li>
            <li className="cursor-pointer">Wishlist</li>
            <li className="cursor-pointer">My Collection</li>
          </ul>

          <form className="flex items-center">
            <div className="group relative rounded-md bg-white">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-primary"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                />
              </svg>
              <input
                type="text"
                placeholder="Filter books..."
                className="search"
                id="lws-searchBook"
                value={input}
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </form>
        </div>
      </nav>
      <main className="py-12 2xl:px-6">
        <div className="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
          <div className="order-2 xl:-order-1">
            <Status />

            <div className="lws-bookContainer">
              {/* <!-- Card 1 --> */}
              {books.length ? (
                <>
                  {filteredData.length ? (
                    <>
                      {filteredData.filter(filterByStatus).map((book) => (
                        <Book key={book.id} book={book} />
                      ))}
                    </>
                  ) : (
                    <div className="font-bold text-center">
                      No data found, please input the correct key-word
                      <div className="mt-2 space-x-1">
                        <span style={{ color: 'blue' }}>Tips: </span>
                        <span>search by book's Name</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="font-bold">No book added. Please add the books.</div>
              )}
            </div>
          </div>
          <AddBook />
        </div>
      </main>
    </>
  );
}
