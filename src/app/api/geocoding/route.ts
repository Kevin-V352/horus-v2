import { type NextRequest } from 'next/server';

import { type MinGeocodingResponse } from '@/interfaces';
import { mapboxServices } from '@/serverServices';

export const GET = async (req: NextRequest): Promise<Response> => {

  const url = new URL(req.url);

  const location = url.searchParams.get('location');

  if (!location || location.trim() === '') {

    return new Response(JSON.stringify({
      error:   'Invalid parameters',
      message: 'Location is required.'
    }));

  };

  const [locationDetails] = await mapboxServices.getDetailsByLocationId(location);

  if (!locationDetails) {

    return new Response(JSON.stringify({
      error:   'Internal error',
      message: 'An unexpected error has occurred'
    }), { status: 500 });

  };

  const formattedData: MinGeocodingResponse[] = locationDetails.features.map((location) => {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, place_name, center } = location;
    const [lon, lat] = center;

    return {
      id,
      lat,
      lon,
      locationName: place_name
    };

  });

  return new Response(JSON.stringify(formattedData), { status: 200 });

};
