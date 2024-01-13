import { openWeather25API } from '@/config';
import {
  type MinWeatherResponse,
  type OpenWeaterQueryParams,
  type OpenWeatherAPI25OneCallResponse
} from '@/interfaces';
import { formatters } from '@/utils';

type TGetCurrentWeatherByCoordinates =
  | [MinWeatherResponse, null]
  | [null, any];

export const getCurrentWeatherByCoordinates = async (lat: number, lon: number): Promise<TGetCurrentWeatherByCoordinates> => {

  const params: OpenWeaterQueryParams = {
    lat,
    lon,
    lang:    'en',
    units:   'metric',
    exclude: 'minutely'
  };

  try {

    const { data } = await openWeather25API.get<OpenWeatherAPI25OneCallResponse>('/onecall', { params });

    const { current, hourly, daily, timezone } = data;

    const formattedData: MinWeatherResponse = {
      current: {
        description:   formatters.capitalize(current.weather[0].description),
        dewPoint:      current.dew_point,
        humidity:      current.humidity,
        iconId:        current.weather[0].icon,
        nextEvent:     formatters.getNextEvent(current.dt, current.sunrise, current.sunset),
        precipitation: current?.rain?.['1h'] ?? 0,
        pressure:      current.pressure,
        sunrise:       formatters.formatTime(current.sunrise, timezone).hhmm,
        sunset:        formatters.formatTime(current.sunset, timezone).hhmm,
        temp:          Math.round(current.temp),
        uvi:           current.uvi,
        visibility:    formatters.metersToKilometers(current.visibility)
      },
      hourly: formatters.formatHourlyForecast(hourly, timezone, current.sunrise, current.sunset),
      daily:  formatters.formatWeeklyForecast(daily, timezone)
    };

    return [formattedData, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};
