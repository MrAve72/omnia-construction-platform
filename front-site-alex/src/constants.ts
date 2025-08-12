import axios from 'axios';

// Use environment variable on Vercel: VITE_API_URL (e.g., https://api.yourdomain.com/api)
// Fallback to relative /api for setups with reverse proxy
const API_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : '/api';

export const instance = axios.create({
  baseURL: API_URL,
});