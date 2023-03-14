/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateLike, updateSave } from '../../features/post/postSlice';

export default function PostDescription() {
  const [saved, setSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(0);

  const { post, likes, isSaved } = useSelector((state) => state.post);

  const { id, title, tags, image, description } = post;

  useEffect(() => {
    setSaved(!isSaved);
    setIsLiked(Number(likes) + 1);
  }, [isSaved, likes]);

  const tagString = tags?.length > 0 ? tags.map((tag) => `#${tag}`).join(', ') : null;

  const dispatch = useDispatch();

  const handleLike = (id) => {
    dispatch(updateLike({ id, isLiked }));
  };

  const handleSave = (id) => {
    dispatch(updateSave({ id, saved }));
  };

  return (
    <main className="post">
      <img src={image} alt={title} className="w-full rounded-md" id="lws-megaThumb" />

      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {title}
        </h1>

        <div className="tags" id="lws-singleTags">
          {tagString}
        </div>

        <div className="btn-group">
          <button
            type="button"
            className="like-btn"
            id="lws-singleLinks"
            onClick={() => handleLike(id)}
          >
            <i className="fa-regular fa-thumbs-up" /> {likes}
          </button>

          <button
            type="button"
            className={`${isSaved ? 'active' : null} save-btn`}
            id="lws-singleSavedBtn"
            onClick={() => handleSave(id)}
          >
            <i className="fa-regular fa-bookmark" /> {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>

        <div className="mt-6">
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
}
