import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllBooksQuery } from '../../features/api/ApiSlice';
import Book from '../book/Book';
import FeatureButton from '../filterbutton/FeatureButton';

import Error from '../ui/Error';
import RotatingLine from '../ui/loaders/RotatingLine';

export default function Home() {
  const { search, filterFeature } = useSelector((state) => state.filter);

  const filterBySearch = (book) => {
    if (search === '') {
      return book;
    }
    if (search !== '') {
      return book.name.toLowerCase().includes(search);
    }
  };

  const { data: books, isLoading, isError } = useGetAllBooksQuery();

  const filterByFeature = (book) => {
    switch (filterFeature) {
      case 'Featured':
        return book.featured;

      default:
        return book;
    }
  };

  let content = null;

  if (isLoading) {
    content = (
      <>
        <RotatingLine />
        <RotatingLine />
        <RotatingLine />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && books?.length === 0) {
    content = <Error message="No books found!" />;
  }

  if (!isLoading && !isError && books?.length > 0) {
    content = books
      .filter(filterBySearch)
      .filter(filterByFeature)
      .map((book) => <Book key={book.id} book={book} />);
  }
  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <FeatureButton />
        <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {content}
        </div>
      </div>
    </main>
  );
}
