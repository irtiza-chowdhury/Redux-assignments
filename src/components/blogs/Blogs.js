import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../features/blogs/blogSlice';
import Loading from '../ui/Loading';
import BlogsItem from './BlogsItem';

export default function Blogs() {
  const { blogs, isLoading, isError, error } = useSelector((state) => state.blogs);

  const filter = useSelector((state) => state.filter);
  const { status, sort } = filter;

  const sortedArr = blogs.slice().sort((a, b) => {
    switch (sort) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'most_liked':
        return Number(b.likes) - Number(a.likes);

      default:
        return a;
    }
  });

  const filterByStatus = (blog) => {
    switch (status) {
      case 'Saved':
        return blog.isSaved;

      default:
        return blog;
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  let content;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) {
    content = <div className="col-span-12">{error}</div>;
  }

  if (!isLoading && !isError && blogs.length === 0) {
    content = <div className="col-span-12">No blog found!</div>;
  }

  if (!isLoading && !isError && blogs.length > 0) {
    content = sortedArr
      .filter(filterByStatus)
      .map((blog) => <BlogsItem key={blog.id} blog={blog} />);
  }

  return (
    <main className="post-container" id="lws-postContainer">
      {content}
    </main>
  );
}
