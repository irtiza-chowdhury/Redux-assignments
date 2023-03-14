import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedPost } from '../../features/relatedPost/relatedPostSlice';
import Loading from '../ui/Loading';
import RelatedPostsItem from './relatedPostsItem';

export default function RelatedPosts({ tags, id }) {
  const { relatedPost, isLoading, isError, error } = useSelector((state) => state.relatedPost);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRelatedPost({ tags, id }));
  }, [dispatch, id, tags]);

  let content;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) {
    content = <div className="col-span-12">{error}</div>;
  }

  if (!isLoading && !isError && relatedPost.length === 0) {
    content = <div className="col-span-12">No post found!</div>;
  }

  if (!isLoading && !isError && relatedPost.length > 0) {
    content = relatedPost.map((post) => <RelatedPostsItem key={post.id} post={post} />);
  }
  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>

      <div className="space-y-4 related-post-container">{content}</div>
    </aside>
  );
}
