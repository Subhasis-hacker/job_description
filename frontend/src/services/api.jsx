import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const generateJobDescription = async (data) => {
  const response = await api.post('/generate', data);
  return response.data;
};

export const getDrafts = async () => {
  const response = await api.get('/drafts');
  return response.data;
};

export const deleteDraft = async (id) => {
  const response = await api.delete(`/drafts/${id}`);
  return response.data;
};
