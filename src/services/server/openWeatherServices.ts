import { openWeather25API } from '@/config';
import {
  type MinWeatherResponse,
  type DayEvent,
  type OpenWeaterQueryParams,
  type OpenWeatherAPI25OneCallResponse
} from '@/interfaces';
import { formatters } from '@/utils';

type TGetCurrentWeatherByCoordinates =
  | [MinWeatherResponse, null]
  | [null, any];

export const getCurrentWeatherByCoordinates = async (lat: string, lon: string): Promise<TGetCurrentWeatherByCoordinates> => {

  const paramsToSend: OpenWeaterQueryParams = {
    lat:     Number(lat),
    lon:     Number(lon),
    lang:    'en',
    units:   'metric',
    exclude: 'minutely'
  };

  try {

    const { data } = await openWeather25API.get<OpenWeatherAPI25OneCallResponse>('/onecall', {
      params: paramsToSend
    });

    const { current, hourly, daily } = data;

    let sunset: DayEvent = null;
    let sunrise: DayEvent = null;

    if (current?.sunset) {

      const currentSunset = new Date(current.sunset * 1000);
      sunset = { hour: currentSunset.getHours(), minutes: currentSunset.getMinutes() };

    };

    if (current?.sunrise) {

      const currentSunrise = new Date(current.sunrise * 1000);
      sunrise = { hour: currentSunrise.getHours(), minutes: currentSunrise.getMinutes() };

    };

    const formattedData: MinWeatherResponse = {
      current: {
        description:   formatters.capitalize(current.weather[0].description),
        dewPoint:      current.dew_point,
        humidity:      current.humidity,
        iconId:        current.weather[0].icon,
        precipitation: current?.rain?.['1h'] ?? 0,
        pressure:      current.pressure,
        sunrise:       sunrise ? formatters.formatTime(`${sunrise.hour}:${sunrise.minutes}`) : null,
        sunset:        sunset ? formatters.formatTime(`${sunset.hour}:${sunset.minutes}`) : null,
        temp:          Math.round(current.temp),
        uvi:           current.uvi
      },
      hourly: formatters.insertSunsetAndSunrise(hourly, sunset, sunrise),
      daily:  daily.map(({ temp, weather, dt }) => ({
        dayName: formatters.getDayNames(dt),
        dayTemp: Math.round(temp.day),
        iconId:  weather[0].icon,
        maxTemp: Math.round(temp.max),
        minTemp: Math.round(temp.min)
      }))
    };

    return [formattedData, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};
