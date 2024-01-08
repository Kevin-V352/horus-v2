import { mapboxAPI } from '@/config';
import { type MapboxGeocodingV5SearchEnpointQueryParams, type MapboxGeocodingSearchEnpointV5Response } from '@/interfaces';

type TGetCoordinatesByPlaceId =
  | [MapboxGeocodingSearchEnpointV5Response, null]
  | [null, any];

export const getDetailsByLocationId = async (locationId: string): Promise<TGetCoordinatesByPlaceId> => {

  const endpoint = `/geocoding/v5/mapbox.places/${locationId}.json`;
  const params: MapboxGeocodingV5SearchEnpointQueryParams = {
    types: 'country,region,locality,place'
  };

  try {

    const { data } = await mapboxAPI.get<MapboxGeocodingSearchEnpointV5Response>(endpoint, { params });
    return [data, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};
