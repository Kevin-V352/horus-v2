import Joi from 'joi';
import { type NextRequest } from 'next/server';

import { type FavoriteLocation } from '@/interfaces';
import { openWeatherServices } from '@/services/server';

export const POST = async (req: NextRequest): Promise<Response> => {

  const favoriteLocationSchema = Joi.object({
    id:           Joi.string().required(),
    lat:          Joi.number().required(),
    lon:          Joi.number().required(),
    locationName: Joi.string().required()
  });

  const favoriteLocationsArraySchema = Joi.array().items(favoriteLocationSchema);

  const body: { favoriteLocations: FavoriteLocation[] } = await req.json();
  const { favoriteLocations } = body;

  if (!favoriteLocations || !Array.isArray(body.favoriteLocations)) {

    return new Response(JSON.stringify({
      error:   'Invalid parameters',
      message: 'The "favoriteLocations" parameter is not a valid array.'
    }), { status: 400 });

  };

  const { error } = favoriteLocationsArraySchema.validate(favoriteLocations);

  if (error) {

    return new Response(JSON.stringify({
      error:   'Invalid parameters',
      message: error.details[0].message
    }), { status: 400 });

  };

  const [response] = await openWeatherServices.getCurrentWeatherByMultipleCoordinates(favoriteLocations);

  if (!response) {

    return new Response(JSON.stringify({
      error:   'Internal error',
      message: 'An unexpected error has occurred'
    }), { status: 500 });

  };

  // TODO: TERMINAR DE TIPAR ESTO BIEN (DEVOLVER FAVORITOS)
  const favoriteClientResponse = response.map((a) => {

    a[0];

  });

  return new Response(JSON.stringify(response), { status: 200 });

};
