import { type MinGeocodingClientResponse, MinGeocodingResponseType } from '@/interfaces';

type TGetUserLocationResponse =
  | [GeolocationCoordinates, null]
  | [null, any];

const userLocationHistoryKey = 'userLocationHistory';

const requestUserLocation = async (): Promise<GeolocationCoordinates> => {

  // eslint-disable-next-line @typescript-eslint/return-await
  return new Promise((resolve, reject) => {

    if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {

        resolve(position.coords);

      }, (error) => {

        reject(error);

      });

    } else {

      reject(new Error('Geolocation is not supported by this browser.'));

    };

  });

};

export const getUserLocation = async (): Promise<TGetUserLocationResponse> => {

  try {

    const location = await requestUserLocation();
    return [location, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};

export const saveLocationInLocalHistory = (location: MinGeocodingClientResponse): void => {

  const userLocationHistoryFromLocalStorage = localStorage.getItem(userLocationHistoryKey);
  let newUserLocationHistory: MinGeocodingClientResponse[] = [];

  if (userLocationHistoryFromLocalStorage) {

    const userLocationHistory: MinGeocodingClientResponse[] = JSON.parse(userLocationHistoryFromLocalStorage);
    const itemIndexInHistory = userLocationHistory.findIndex(({ label }) => (label === location.label));

    if (itemIndexInHistory === 0 && userLocationHistory.length === 1) return;

    if (itemIndexInHistory !== -1) {

      const tempHistory = [
        ...userLocationHistory.slice(0, itemIndexInHistory),
        ...userLocationHistory.slice(itemIndexInHistory + 1)
      ];

      newUserLocationHistory = [{ ...location, type: MinGeocodingResponseType.historyItem }, ...tempHistory];

    } else {

      const tempHistory = (userLocationHistory.length + 1 === 6)
        ? userLocationHistory.slice(0, -1)
        : userLocationHistory;

      newUserLocationHistory = [{ ...location, type: MinGeocodingResponseType.historyItem }, ...tempHistory];

    };

  } else {

    newUserLocationHistory = [{ ...location, type: MinGeocodingResponseType.historyItem }];

  };

  localStorage.setItem(userLocationHistoryKey, JSON.stringify(newUserLocationHistory));

};

export const getLocationFromLocalHistory = (): MinGeocodingClientResponse[] => {

  const userLocationHistoryFromLocalStorage = localStorage.getItem(userLocationHistoryKey);

  if (userLocationHistoryFromLocalStorage) return JSON.parse(userLocationHistoryFromLocalStorage);
  else return [];

};
