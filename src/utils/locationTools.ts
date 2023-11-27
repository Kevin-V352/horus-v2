type TGetUserLocationResponse =
  | [GeolocationCoordinates, null]
  | [null, any];

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
