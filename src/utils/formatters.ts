import { type MinHourlyWeater, type Current, type DayEvent } from '@/interfaces';

export const formatTime = (time: string): string => {

  const [hours, minutes] = time.split(':');

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

};

export const insertSunsetAndSunrise = (hours: Current[], sunset: DayEvent, sunrise: DayEvent): MinHourlyWeater[] => {

  const result: MinHourlyWeater[] = hours.slice(0, 24).map((hourItem) => ({
    iconId: hourItem.weather[0].icon,
    temp:   Math.round(hourItem.temp),
    type:   'hour',
    hour:   new Date(hourItem.dt * 1000).getHours()
  }));

  if (sunset) {

    result.pop();
    const sunsetIndex = result.findIndex(({ hour }) => (hour === sunset.hour));
    if (sunsetIndex !== -1) {

      result[sunsetIndex] = {
        iconId: '10001n',
        temp:   0,
        type:   'sunset',
        hour:   formatTime(`${sunset.hour}:${sunset.minutes}`) as any
      };

    }

  };

  if (sunrise) {

    result.pop();
    const sunsetIndex = result.findIndex(({ hour }) => (hour === sunrise.hour));
    if (sunsetIndex !== -1) {

      result[sunsetIndex] = {
        iconId: '10001d',
        temp:   0,
        type:   'sunrise',
        hour:   formatTime(`${sunrise.hour}:${sunrise.minutes}`)
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
