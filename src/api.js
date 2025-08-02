// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://springreact-5sgt.onrender.com/api', // Ensure your backend runs here
});

export default api;
