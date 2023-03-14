import React from 'react';
import { Link } from 'react-router-dom';

export default function RelatedPostsItem({ post }) {
  const { image, id, tags, title, createdAt } = post;

  const tagString = tags?.length > 0 ? tags.map((tag) => `#${tag}`).join(', ') : null;

  return (
    <div className="card">
      <Link to={`/blogs/${id}`}>
        <img src={image} className="card-image" alt={title} />
      </Link>
      <div className="p-4">
        <Link to={`/blogs/${id}`} className="text-lg post-title lws-RelatedPostTitle">
          {title}
        </Link>

        <div className="mb-0 tags">{tagString}</div>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}
