import { credentials } from '@/constants';
import { FetchAPI } from '@/utils';

const openWeather25APIBeta = new FetchAPI('https://api.openweathermap.org/data/2.5', {
  params: {
    appid: credentials.OPEN_WEATHER_API_KEY
  }
});

export default openWeather25APIBeta;
