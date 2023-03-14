import React from 'react';

import { useParams } from 'react-router-dom';
import { useGetEditedBookQuery } from '../../features/api/ApiSlice';
import EditForm from '../form/EditForm';
import Error from '../ui/Error';
import RotatingLine from '../ui/loaders/RotatingLine';

export default function EditBook() {
  const { bookId } = useParams();
  const { data: book, isError, isLoading } = useGetEditedBookQuery(bookId);

  let content = null;

  if (isLoading) {
    content = <RotatingLine />;
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && book?.id === -1) {
    content = <Error message="No book found!" />;
  }

  if (!isLoading && !isError && book?.id >= 0) {
    content = <EditForm book={book} />;
  }
  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
          {content}
        </div>
      </div>
    </main>
  );
}
