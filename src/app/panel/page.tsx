import { type FC } from 'react';

import { redirect } from 'next/navigation';

import { PanelPage } from '@/pages';
import { mapboxServices, openWeatherServices } from '@/serverServices';

const Home: FC<{ params: { slug: string }; searchParams: Record<string, string | string[] | undefined> }> = async ({ params, searchParams }) => {

  const locationId = searchParams.locationId;

  if (!locationId || Array.isArray(locationId)) redirect('/location');

  const [locationDetails] = await mapboxServices.getDetailsByLocationId(locationId);

  if (!locationDetails) return redirect('/panel/error');

  if (locationDetails.features.length < 1) return redirect('/panel/404');

  const { place_name: locationName, center } = locationDetails.features[0];
  const [lon, lat] = center;

  const [weather] = await openWeatherServices.getCurrentWeatherByCoordinates(lat, lon);

  if (!weather) return <span>error</span>;

  return (
    <PanelPage
      locationName={locationName}
      locationId={locationId}
      lat={Number(lat)}
      lon={Number(lon)}
      weather={weather}
    />
  );

};

export default Home;
