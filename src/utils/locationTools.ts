import { type MinGeocodingClientResponse, MinGeocodingResponseType, type FavoriteLocation } from '@/interfaces';

type TGetUserLocationResponse =
  | [GeolocationCoordinates, null]
  | [null, any];

type TGetFavoriteLocationsFromLocalStorage =
  | [FavoriteLocation[], null]
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

export const getFavoriteLocationsFromLocalStorage = (): TGetFavoriteLocationsFromLocalStorage => {

  try {

    let parsedItems: FavoriteLocation[] = [];
    const favoriteLocations = localStorage.getItem('favoriteLocations');

    if (favoriteLocations) parsedItems = JSON.parse(favoriteLocations);

    return [parsedItems, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};

export const saveFavoriteLocationsInLocalStorage = (label: string, locationId: string): boolean => {

  const [savedFavoriteLocations] = getFavoriteLocationsFromLocalStorage();

  let previousFavoriteLocations: FavoriteLocation[] = [];

  if (savedFavoriteLocations) previousFavoriteLocations = savedFavoriteLocations;

  try {

    const locationIndex = previousFavoriteLocations.findIndex((favoriteLocation) => favoriteLocation.locationId === locationId);
    if (locationIndex !== -1) return true;

    localStorage.setItem('favoriteLocations', JSON.stringify([...previousFavoriteLocations, { label, locationId }]));

    return true;

  } catch (error) {

    console.error(error);
    return false;

  };

};

export const deleteFavoriteLocationFromLocalStorage = (locationId: string): boolean => {

  const [savedFavoriteLocations] = getFavoriteLocationsFromLocalStorage();

  let previousFavoriteLocations: FavoriteLocation[] = [];

  if (savedFavoriteLocations) previousFavoriteLocations = savedFavoriteLocations;
  else return true;

  try {

    const locationIndex = previousFavoriteLocations.findIndex((favoriteLocation) => favoriteLocation.locationId === locationId);
    if (locationIndex === -1) return true;

    previousFavoriteLocations.splice(locationIndex, 1);
    localStorage.setItem('favoriteLocations', JSON.stringify(previousFavoriteLocations));

    return true;

  } catch (error) {

    console.error(error);
    return false;

  };

};
