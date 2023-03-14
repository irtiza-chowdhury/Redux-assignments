/* eslint-disable prettier/prettier */
import axios from '../../utilities/axios';

const getBlogs = async () => {
  const response = await axios.get('/blogs');
  return response.data;
};


export default getBlogs;
