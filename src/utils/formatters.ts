import { type MinHourlyWeater, type Current } from '@/interfaces';

interface IFormatTimeResponse {
  hh:   string;
  mm:   string;
  hhmm: string;
};

export const formatTime = (unixSeconds: number, timeZone: string): IFormatTimeResponse => {

  const date = new Date((unixSeconds * 1000));
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour:   '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const formatted = formatter.format(date);
  const [hours, minutes] = formatted.split(':');

  return {
    hh:   hours,
    mm:   minutes,
    hhmm: `${hours}:${minutes}`
  };

};

export const insertSunsetAndSunrise = (hours: Current[], timeZone: string, sunrise: number, sunset: number): MinHourlyWeater[] => {

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

export const getDayNames = (timestamp: number): string => {

  const dateToCompare = new Date((timestamp * 1000));
  const currentDate = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = currentDate.toDateString() === dateToCompare.toDateString();
  const isTomorrow = tomorrow.toDateString() === dateToCompare.toDateString();

  if (isToday) return 'Today';
  else if (isTomorrow) return 'Tomorrow';
  else return new Date((timestamp * 1000)).toLocaleDateString('en-US', { weekday: 'long' });

};

export const capitalize = (string: string): string => string[0].toUpperCase() + string.slice(1);

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

    if (currentUTC < sunsetUTC && sunsetUTC < sunriseUTC) {

      return 'sunset';

    } else {

      return 'sunrise';

    }

  } else if (currentUTC < sunsetUTC) {

    return 'sunset';

  } else {

    // Aquí, tanto el amanecer como el atardecer ya ocurrieron,
    // podrías calcular los eventos del día siguiente o manejarlo según sea necesario
    return 'sunrise';

  }

};
