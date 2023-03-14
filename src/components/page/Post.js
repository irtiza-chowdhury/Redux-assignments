import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../../features/post/postSlice';
import PostDescription from '../description/postDescription';
import GoHome from '../goHome/goHome';
import RelatedPosts from '../relatedPosts/relatedPosts';
import Loading from '../ui/Loading';

export default function Post() {
  const { postId } = useParams();

  const { post, isLoading, isError, error } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const { id, tags } = post;

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [dispatch, postId]);

  let content;
  if (isLoading) content = <Loading />;

  if (!isLoading && isError) {
    content = <div className="col-span-12">{error}</div>;
  }

  if (!isLoading && !isError && post.id < 0) {
    content = <div className="col-span-12">No blog found!</div>;
  }
  if (!isLoading && !isError && post.id >= 0) {
    content = (
      <>
        <PostDescription />
        <RelatedPosts id={id} tags={tags} />
      </>
    );
  }

  return (
    <>
      <GoHome />
      <section className="post-page-container">{content}</section>
    </>
  );
}
