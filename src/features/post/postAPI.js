/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import axios from '../../utilities/axios';

const getPost = async (id) => {
  const response = await axios.get(`/blogs/${id}`);
  return response.data;
};

export const saveUpdate = async (id, saved) => {
  const data = { 'isSaved': saved };
  const response = await axios.patch(`/blogs/${id}`, data);
  return response.data.isSaved;
};


export const likeUpdate = async (id, isLiked) => {
  const data = { "likes": isLiked };
  const response = await axios.patch(`/blogs/${id}`, data);
  return response.data.likes;
};


export default getPost;
