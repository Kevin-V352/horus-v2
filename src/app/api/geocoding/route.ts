import { type NextRequest } from 'next/server';

import { mapboxAPI } from '@/config';
import { type MinGeocodingResponse, type MapboxGeocodingV5Response } from '@/interfaces';

export const GET = async (req: NextRequest): Promise<Response> => {

  const url = new URL(req.url);

  const location = url.searchParams.get('location');

  if (!location || location.trim() === '') {

    return new Response(JSON.stringify({
      error:   'Invalid parameters',
      message: 'Location is required.'
    }));

  };

  const paramsToSend = {
    proximity: 'ip',
    types:     'country,region,locality,place'
  };

  const endpoint = `/geocoding/v5/mapbox.places/${location}.json`;

  try {

    const { data } = await mapboxAPI.get<MapboxGeocodingV5Response>(endpoint, {
      params: paramsToSend
    });

    const formattedData: MinGeocodingResponse[] = data.features.map((location) => {

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { place_name, center } = location;
      const [lon, lat] = center;

      return {
        locationName: place_name,
        lat,
        lon
      };

    });

    return new Response(JSON.stringify(formattedData), { status: 200 });

  } catch (error) {

    console.error(error);
    return new Response(JSON.stringify({
      error:   'Internal error',
      message: 'An unexpected error has occurred'
    }), { status: 500 });

  };

};
