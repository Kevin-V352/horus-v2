import { type FC } from 'react';

import { redirect } from 'next/navigation';

import { HomePage } from '@/pages';
import { openWeatherServices } from '@/serverServices';

const Home: FC<{ params: { slug: string }; searchParams: Record<string, string | string[] | undefined> }> = async ({ params, searchParams }) => {

  const [lat, lon] = [searchParams.lat, searchParams.lon];

  if (!(lat ?? lon)) redirect('/location');

  const [weather] = await openWeatherServices.getCurrentWeatherByCoordinates(lat as string, lon as string);

  if (!weather) return <span>error</span>;

  return <HomePage weather={weather}/>;

};

export default Home;
