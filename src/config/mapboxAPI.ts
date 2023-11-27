import axios from 'axios';

import { credentials } from '@/constants';

const mapboxAPI = axios.create({
  baseURL: 'https://api.mapbox.com',
  params:  {
    access_token: credentials.MAP_BOX_API_KEY
  }
});

export default mapboxAPI;
