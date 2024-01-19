import { horusAPI } from '@/config';
import { type MinGeocodingClientResponse, MinGeocodingResponseType, type MinGeocodingResponse } from '@/interfaces';

type TGetLocations =
  | [MinGeocodingClientResponse[], null]
  | [null, any];

type TGetLocationIdByCoordinates =
  | [string, null]
  | [null, any];

export const getLocations = async (location: string): Promise<TGetLocations> => {

  try {

    const { data } = await horusAPI.get<MinGeocodingResponse[]>('/geocoding', {
      params: {
        location
      }
    });

    const newLocations: MinGeocodingClientResponse[] = data.map(({ lat, lon, locationName, id }, index) => ({
      lat,
      lon,
      tempId: (Date.now() + index),
      type:   MinGeocodingResponseType.newItem,
      label:  locationName,
      value:  id
    }));

    return [newLocations, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};

export const getLocationIdByCoordinates = async (lat: number, lon: number): Promise<TGetLocationIdByCoordinates> => {

  try {

    if (!lat || !lon) throw new Error('Parameters "lat" or "lon" were not passed correctly.');

    const params = {
      location: `${lon},${lat}`
    };

    const { data } = await horusAPI.get<MinGeocodingResponse[]>('/geocoding', { params });

    if (data.length < 1) throw new Error('No location related to the coordinates has been found.');

    return [data[0].id, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};
