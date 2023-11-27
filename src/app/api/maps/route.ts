import { type NextRequest } from 'next/server';

import { credentials } from '@/constants';
import { LayerTypes } from '@/interfaces';

export const GET = async (req: NextRequest): Promise<Response> => {

  const url = new URL(req.url);

  const x = url.searchParams.get('x');
  const y = url.searchParams.get('y');
  const z = url.searchParams.get('z');
  const type = url.searchParams.get('type');

  const testArr = [x, y, z];
  const invalidCoordinate = testArr.findIndex((testItem) => ((testItem === null) || (typeof Number(testItem) !== 'number')));
  const invalidType = ((type === null) || !(type in LayerTypes));

  if (invalidCoordinate !== -1 || invalidType) {

    return new Response(JSON.stringify({
      error:   'Invalid parameters',
      message: invalidType
        ? `The ${type} value is invalid. The type must correspond to "LayerTypes".`
        : `The ${testArr[invalidCoordinate]} value is invalid. Coordinates must be numeric values.`
    }), { status: 200 });

  };

  try {

    const response = await fetch(`https://tile.openweathermap.org/map/${type}/${z}/${x}/${y}.png?appid=${credentials.OPEN_WEATHER_API_KEY}`);

    return new Response(response.body, {
      headers: {
        ...response.headers,
        'content-disposition': `attachment; filename="${type}-${z}-${x}-${y}"`
      }
    });

  } catch (error) {

    console.error(error);
    return new Response(JSON.stringify({
      error:   'Internal error',
      message: 'An unexpected error has occurred'
    }), { status: 500 });

  };

};
