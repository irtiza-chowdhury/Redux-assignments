import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogsItem({ blog }) {
  const { id, title, image, tags, likes, isSaved, createdAt } = blog;

  const tagString = tags?.length > 0 ? tags.map((tag) => `#${tag}`).join(', ') : null;

  return (
    <div className="lws-card">
      <Link to={`blogs/${id}`}>
        <img src={image} className="lws-card-image" alt={title} />
      </Link>

      <div className="p-4">
        <div className="lws-card-header">
          <p className="lws-publishedDate">{createdAt}</p>
          <p className="lws-likeCount">
            <i className="fa-regular fa-thumbs-up" />
            {likes}
          </p>
        </div>
        <Link to={`blogs/${id}`} className="lws-postTitle">
          {title}
        </Link>
        <div className="lws-tags">
          <span> {tagString} </span>
        </div>

        <div className="flex gap-2 mt-4">
          {isSaved && <span className="lws-badge"> Saved </span>}
        </div>
      </div>
    </div>
  );
}
