import axios from '../../utilities/axios';

const getRelatedPost = async ({ tags, id }) => {
  const quearyString =
    tags?.length > 0
      ? `${tags.map((tag) => `tags_like=${tag}`).join('&')}&id_ne=${id}`
      : `&id_ne=${id}`;

  const response = await axios.get(`/blogs?${quearyString}`);
  return response.data;
};

export default getRelatedPost;
