import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proffy-api-v1.herokuapp.com',
});

export default api;
