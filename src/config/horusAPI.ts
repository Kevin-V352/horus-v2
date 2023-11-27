import axios from 'axios';

const horusAPI = axios.create({
  baseURL: '/api'
});

export default horusAPI;
