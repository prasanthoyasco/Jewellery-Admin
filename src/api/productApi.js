import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export const getProducts = () => API.get('/products');
export const uploadProduct = (formData) =>
  API.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });