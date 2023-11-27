import axios from 'axios';

import { credentials } from '@/constants';

const openWeather25API = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params:  {
    appid: credentials.OPEN_WEATHER_API_KEY
  }
});

export default openWeather25API;
