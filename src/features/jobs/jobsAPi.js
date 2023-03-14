import axios from '../../utils/axios';

export const getJob = async () => {
  const response = await axios.get('/jobs');

  return response.data;
};

export const addJob = async (data) => {
  const response = await axios.post('/jobs', data);

  return response.data;
};

export const editJob = async (id, data) => {
  const response = await axios.put(`/jobs/${id}`, data);

  return response.data;
};

export const deleteJob = (id) => {
  const response = axios.delete(`/jobs/${id}`);

  return response.data;
};

export const getEditJob = async (id) => {
  const response = await axios.get(`/jobs/${id}`);

  return response.data;
};
