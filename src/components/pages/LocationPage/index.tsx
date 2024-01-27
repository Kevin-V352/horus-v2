'use client';

import { useEffect, type FC, useState } from 'react';

import { useRouter } from 'next/navigation';
import { type SingleValue } from 'react-select';

import { locationServices } from '@/clientServices';
import { CompassFill } from '@/components/icons';
import { type MinGeocodingClientResponse } from '@/interfaces';
import { BackgroundImage, Button, Card, LocationAutocomplete } from '@/ui';
import { locationTools } from '@/utils';

const LocationPage: FC = () => {

  const [currentLocationId, setCurrentLocationId] = useState<string | null>(null);

  useEffect(() => {

    void retrieveUserLocation();

  }, []);

  const router = useRouter();

  const retrieveUserLocation = async (): Promise<void> => {

    const [userLocation] = await locationTools.getUserLocation();

    if (!userLocation) return;

    const { latitude, longitude } = userLocation;

    const [locationId] = await locationServices.getLocationIdByCoordinates(latitude, longitude);

    if (locationId) setCurrentLocationId(locationId);

  };

  const redirectToPanel = (locationId: string): void => {

    router.push(`/panel?locationId=${locationId}`);

  };

  const onLocationChange = (newValue: SingleValue<MinGeocodingClientResponse>): void => {

    if (!newValue) return;

    const { value: locationId } = newValue;

    locationTools.saveLocationInLocalHistory(newValue);
    redirectToPanel(locationId);

  };

  const onCurrentUserLocation = (): void => {

    if (currentLocationId) redirectToPanel(currentLocationId);

  };

  const [favoriteLocations] = locationTools.getFavoriteLocationsFromLocalStorage();
  const parsedFavoriteLocations = favoriteLocations ?? [];

  return (
    <BackgroundImage backgroundId="01d">
      <div className="min-h-screen p-4 flex flex-col gap-8 bg-black_transparent_03">
        <h1 className="text-4xl text-center font-bold text-white">Explore Weather with a Click</h1>
        <section className="flex flex-col gap-4">
          <LocationAutocomplete onChange={onLocationChange}/>
          <div className="flex items-center">
            <div className="flex-1 bg-white h-px"/>
            <span className="text-white mx-2 text-base">or</span>
            <div className="flex-1 bg-white h-px"/>
          </div>
          <Button
            onClick={onCurrentUserLocation}
            disabled={!currentLocationId}
            loading={!currentLocationId}
          >
            Use my current location
          </Button>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="text-white text-center text-xl font-bold">My favorite locations</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {
              parsedFavoriteLocations.map(({ locationName }, index) => (
                <Card
                  key={index}
                  headIcon={<CompassFill/>}
                  onClose={() => {

                    console.log('AAA');

                  }}
                >
                  <h3 className="text-white truncate text-ellipsis">{locationName}</h3>
                </Card>
              ))
            }
          </div>
        </section>
      </div>
    </BackgroundImage>
  );

};

export default LocationPage;
