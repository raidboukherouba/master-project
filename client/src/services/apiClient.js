import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
});

export default apiClient;