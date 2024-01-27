import momentTimeZone from 'moment-timezone';

import { type MinHourlyWeater, type Current, type Daily, type MinDailyWeater } from '@/interfaces';

interface IFormatTimeResponse {
  hh:   string;
  mm:   string;
  hhmm: string;
};

export const formatTime = (unixSeconds: number, timeZone: string): IFormatTimeResponse => {

  const date = momentTimeZone.unix(unixSeconds).tz(timeZone);
  const hours = date.format('HH');
  const minutes = date.format('mm');

  return {
    hh:   hours,
    mm:   minutes,
    hhmm: `${hours}:${minutes}`
  };

};

export const formatHourlyForecast = (hours: Current[], timeZone: string, sunrise: number, sunset: number): MinHourlyWeater[] => {

  const result: MinHourlyWeater[] = hours.slice(0, 24).map((hourItem) => ({
    iconId: hourItem.weather[0].icon,
    temp:   Math.round(hourItem.temp),
    type:   'hour',
    hour:   formatTime(hourItem.dt, timeZone).hh
  }));

  if (sunrise) {

    const { hh: sunriseHour } = formatTime(sunrise, timeZone);
    const sunriseIndex = result.findIndex(({ hour }) => (hour === sunriseHour));

    if (sunriseIndex !== -1) {

      result[sunriseIndex] = {
        iconId: '10001d',
        temp:   0,
        type:   'sunrise',
        hour:   formatTime(sunrise, timeZone).hhmm
      };

    };

  };

  if (sunset) {

    const { hh: sunsetHour, hhmm: sunsetFullTime } = formatTime(sunset, timeZone);
    const sunsetIndex = result.findIndex(({ hour }) => (hour === sunsetHour));

    if (sunsetIndex !== -1) {

      result[sunsetIndex] = {
        iconId: '10001n',
        temp:   0,
        type:   'sunset',
        hour:   sunsetFullTime
      };

    };

  };

  return result;

};

export const formatWeeklyForecast = (daily: Daily[], timeZone: string): MinDailyWeater[] => {

  return daily.map(({ temp, weather, dt }, index) => ({
    dayName: (index === 0) ? 'Today' : (index === 1) ? 'Tomorrow' : momentTimeZone.unix(dt).tz(timeZone).format('dddd'),
    dayTemp: Math.round(temp.day),
    iconId:  weather[0].icon,
    maxTemp: Math.round(temp.max),
    minTemp: Math.round(temp.min)
  }));

};

export const getTempPercentage = (tempMin: number, tempMax: number, temp: number): number => {

  if (tempMin > tempMax) [tempMin, tempMax] = [tempMax, tempMin];

  const percentageRemaining = (((tempMax - temp) / (tempMax - tempMin)) * 100);

  return Math.min(100, Math.max(0, percentageRemaining));

};

export const getNextEvent = (currentUnix: number, sunriseUnix: number, sunsetUnix: number): 'sunrise' | 'sunset' => {

  const currentUTC = (currentUnix * 1000);
  const sunriseUTC = (sunriseUnix * 1000);
  const sunsetUTC = (sunsetUnix * 1000);

  if (currentUTC < sunriseUTC) {

    if (currentUTC < sunsetUTC && sunsetUTC < sunriseUTC) return 'sunset';
    else return 'sunrise';

  } else if (currentUTC < sunsetUTC) {

    return 'sunset';

  } else {

    return 'sunrise';

  };

};

export const metersToKilometers = (meters: number): number => (meters / 1000);

export const capitalize = (string: string): string => string[0].toUpperCase() + string.slice(1);
