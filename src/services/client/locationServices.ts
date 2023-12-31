import { horusAPI } from '@/config';
import { type MinGeocodingClientResponse, type MinGeocodingResponse, MinGeocodingResponseType } from '@/interfaces';

export const getLocations = async (location: string): Promise<MinGeocodingClientResponse[]> => {

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

  return newLocations;

};
